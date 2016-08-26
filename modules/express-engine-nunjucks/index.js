'use strict';

/**
 * 项目脚手架 express-engine-nunjucks 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {
  'express': '*',
};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 自动转义输出的变量
    autoescape: true,
    // 监听文件变化，有更新时自动重载
    watch: true,
    // 当变量是undefined时抛出异常
    throwOnUndefined: false,
    // 删除标签空行
    trimBlocks: false,
    // 删除标签左边的空格
    lstripBlocks: false,
    // 不使用缓存
    noCache: true,
    // 模板引擎目录
    viewsDir: this.get('express.app').get('views'),
    // express实例
    express: this.get('express.app'),
    // 其他参考 nunjucks 模块
  }, config);
};

// 初始化
exports.init = function initExpressEngineNunjucksModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initExpressEngineNunjucksModule config: %j', config);

  // nunjucks.configure(config.viewsDir, config);
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(config.viewsDir, config));
  env.express(config.express);

  Object.assign(ref, { $ns: 'express-engine-nunjucks', env });

  done();

};
