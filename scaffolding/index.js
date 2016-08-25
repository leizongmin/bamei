'use strict';

/**
 * 项目脚手架
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');
const ProjectCore = require('project-core');
const createNamespace = require('lei-ns').create;

// 根据逗号分隔字符串，并删除收尾空格
function splitByComma(str) {
  return str.split(',').map(n => n.trim()).filter(n => n);
}

// 自动探测可能的配置文件名，后缀优先级：.js > .json > .yaml
function getExistsConfigFileName(file) {
  const extnames = [ '', '.js', '.json', '.yaml', '.yml' ];
  for (const ext of extnames) {
    const f = file + ext;
    if (fs.existsSync(f)) {
      return f;
    }
  }
}

class Scaffolding extends ProjectCore {

  /**
   * 创建脚手架实例
   *
   * @param {Object} options
   *   - {String} configDir
   *   - {String} configExtname
   *   - {String} env
   */
  constructor(options) {
    super();

    // eslint-disable-next-line
    options = Object.assign({}, options || {});

    // 配置文件目录
    this._configDir = path.resolve(options.configDir || './config');
    // 配置名称
    this._configNames = splitByComma(options.env || process.env.NODE_ENV || '');
    this._configNames.unshift('default');
    // 加载配置文件
    this._loadConfigFromEnv();

    // 日志记录器
    this._logger = {};
    this._bunyan = bunyan;

    // 用于存储全局数据
    this._ns = createNamespace();

    // 已初始化过的变量
    this._loadedModules = {};

    // 打印已载入的配置
    this.getLogger('init').info(`loaded configs: ${ this._loadedConfigNames.join(', ') }`);
  }

  _loadConfigFromEnv() {
    this._loadedConfigNames = [];
    this._configNames.forEach(n => {
      const f = getExistsConfigFileName(path.resolve(this._configDir, `${ n }`));
      if (!f) {
        // 如果是 default 不存在则不载入
        if (n === 'default') return;
        throw new Error(`config file not found: ${ f }`);
      }
      this.config.load(f);
      this._loadedConfigNames.push(f);
    });
  }

  /**
   * 如果配置项存在则获取配置，否则返回预设的默认值
   *
   * @param {String} name
   * @param {Object} defaultValue
   * @return {Object}
   */
  getConfigOrDefault(name, defaultValue) {
    if (this.config.has(name)) {
      return this.config.get(name);
    }
    return defaultValue;
  }

  /**
   * 取数据
   *
   * @param {String} name
   * @return {Object}
   */
  get(name) {
    return this._ns.get(name);
  }

  /**
   * 设置数据
   *
   * @param {String} name
   * @param {Object} value
   * @return {Object}
   */
  set(name, value) {
    return this._ns.set(name, value);
  }

  /**
   * 获得一个日志记录器
   *
   * @param {String} name
   * @return {Object}
   */
  getLogger(name) {
    if (this._logger[name]) {
      return this._logger[name];
    }
    return this.createLogger(name);
  }

  /**
   * 创建日志记录器
   *
   * @param {String} name
   * @param {Object} config
   * @return {Object}
   */
  createLogger(name, config) {
    // eslint-disable-next-line
    config = Object.assign({ name }, config);
    if (this.config.has(`logger.${ name }`)) {
      Object.assign(config, this.config.get(`logger.${ name }`));
    }
    this._logger[name] = bunyan.createLogger(config);
    return this._logger[name];
  }

  /**
   * 初始化模块
   *
   * @param {String} name
   * @param {String|Object} config
   * @param {Function} callback 格式：function (ref) {} 或 function (ref, done) {}
   * @return {Object}
   */
  module(name, config, callback) {
    const logger = this.getLogger('init');
    const ref = {};
    // 处理参数
    if (typeof config === 'function') {
      // eslint-disable-next-line
      callback = config;
      // eslint-disable-next-line
      config = '';
    }
    // 添加的初始化任务队列中
    this.init.add(done => {
      logger.info(`initing module ${ name }`);

      // 获取配置
      if (!config) {
        // 如果为空则自动读取以模块命名的配置项
        if (this.config.has(name)) {
          // eslint-disable-next-line
          config = this.config.get(name);
        } else {
          // eslint-disable-next-line
          config = {};
          logger.warn(`initing module ${ name } with no config`);
        }
      } else if (typeof config === 'string') {
        // 如果是字符串则自动读取指定配置项
        // eslint-disable-next-line
        config = this.config.get(config);
      }
      // eslint-disable-next-line
      config = Object.assign({}, config || {});

      // 载入模块
      const module = require(`bamei-module-${ name }`);

      // 检查其依赖是否已经初始化
      for (const d in module.dependencies) {
        const v = module.dependencies[d];
        if (!this._checkLoadedModule(d, v)) {
          const msg = `missing dependency ${ d }@${ v }, please run this.module('${ d }') before this.module('${ name }')`;
          logger.error(msg);
          return done(new Error(msg));
        }
      }

      // 初始化
      module.init.call(this, ref, config, err => {
        // init done 回调
        const callDone = err => {
          if (err) {
            logger.error(`initing module ${ name }@${ module.version } fail`, bunyan.stdSerializers.err(err));
          } else {
            logger.info(`initing module ${ name }@${ module.version } success`);
            this._loadedModules[name] = true;
          }
          process.nextTick(() => done(err));
        };

        // 如果出错则直接返回
        if (err) return callDone(err);

        // 设置到 ns 中
        this.set(name, ref);
        if (ref.$ns) {
          this.set(ref.$ns, ref);
        }

        // 执行模块初始化回调
        if (typeof callback === 'function') {

          if (callback.length >= 2) {
            // 异步函数的回调
            callback(ref, callDone);
          } else {
            // 同步函数的回调
            callback(ref);
            callDone();
          }

        } else {
          callDone();
        }
      });
    });
    return ref;
  }

  /**
   * 检查是否已加载对应版本的依赖模块
   *
   * @param {String} name
   * @param {String} version
   * @return {Boolean}
   */
  _checkLoadedModule(name, _version) {
    // TODO: 目前不需要检查版本号
    return !!this._loadedModules[name];
  }

  /**
   * 如果未初始化则添加初始化任务，否则立即执行任务并回调
   *
   * @param {String|Function} task
   * @param {Function} callback
   */
  task(task, callback) {
    if (this.initing || this.inited) {
      return this.run(task, callback);
    }
    if (typeof task === 'function') {
      this.init.add(task);
    } else {
      this.init.load(task);
    }
    if (typeof callback === 'function') {
      this.ready(callback);
    }
  }

  /**
   * 捕捉系统异常
   */
  catchError() {
    const logger = this.getLogger('process');
    process.on('uncaughtException', err => {
      logger.error('uncaughtException', bunyan.stdSerializers.err(err));
    });
    process.on('unhandledRejection', err => {
      logger.error('unhandledRejection', bunyan.stdSerializers.err(err));
    });
    logger.info('enable uncaughtException and unhandledRejection handler');
  }

}

exports.Scaffolding = Scaffolding;

/**
 * 创建脚手架实例
 *
 * @param {Object} options
 * @param {Function} callback
 * @return {Object}
 */
exports.create = function createScaffolding(options, callback) {
  if (typeof options === 'function') {
    // eslint-disable-next-line
    callback = options;
    // eslint-disable-next-line
    options = {};
  }
  const project = new Scaffolding(options);
  if (typeof callback === 'function') {
    callback.call(project, project);
  }
  return project;
};
