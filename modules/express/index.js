'use strict';

/**
 * 项目脚手架 express 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const compression = require('compression');
const expressValidator = require('express-validator');
const onFinished = require('on-finished');
const favicon = require('serve-favicon');
const ejs = require('ejs');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 开始监听端口
    listen: true,
    // 监听的端口
    port: 3000,
    // 监听的地址
    hostname: '0.0.0.0',
    // http访问日志等级
    logLevel: 'TRACE',
    // 静态资源文件路径前缀
    publicPrefix: '/public',
    // 静态资源文件目录
    publicDir: './public',
    // compression 中间件的配置，false 表示关闭
    compression: {},
    // json 中间件的配置，false 表示关闭
    json: {},
    // urlencoded urlencoded 中间件的配置，false 表示关闭
    urlencoded: { extended: false },
    // multiparty 中间件的配置，false 表示关闭
    multiparty: {},
    // cookie 中间件的配置，false 表示关闭
    cookie: { secret: 'hrob8oorrafke11m' },
    // validator 中间件的配置
    validator: {},
    // favicon文件名，false 表示关闭
    favicon: false,
    // 模板目录
    viewsDir: './views',
  }, config);
};

// 初始化
exports.init = function initExpressModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initExpressModule config: %j', config);

  const app = express();

  // 端口
  app.set('port', config.port);
  // 模板引擎
  app.set('view engine', 'html');
  app.engine('html', ejs.__express);
  app.engine('ejs', ejs.__express);
  app.set('views', config.viewsDir);
  // 内容压缩
  if (config.compression) {
    app.use(compression(config.compression));
  }
  // 请求日志记录
  {
    const bunyan = this._bunyan;
    const logger = this.createLogger('http', {
      serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err,
      },
    });
    const level = config.logLevel.toLowerCase();
    if (typeof logger[level] !== 'function') {
      throw new Error(`invalid log level for express module: ${ config.logLevel }`);
    }
    app.use((req, res, next) => {
      onFinished(res, () => {
        logger[level]({ req, res });
      });
      next();
    });
  }
  // favicon
  if (config.favicon) {
    app.use(favicon(config.favicon));
  }
  // 静态资源文件
  app.use(config.publicPrefix, express.static(config.publicDir));
  // body解析
  if (config.json) {
    app.use(bodyParser.json(config.json));
  }
  if (config.urlencoded) {
    app.use(bodyParser.urlencoded(config.urlencoded));
  }
  if (config.multiparty) {
    app.use(multiparty(config.multiparty));
  }
  // express-validator
  if (config.validator) {
    app.use(expressValidator(config.validator));
  }
  // cookie解析
  if (config.cookie) {
    app.use(cookieParser(config.cookie.secret, config.cookie));
  }

  // 已注册的路由
  const router = {};

  // 注册路由
  const registerRouter = (name, path) => {
    // eslint-disable-next-line
    path = path || '/';
    if (router[name]) {
      if (router[name].$$path !== path) {
        throw new Error(`register router conflict for "${ name }": new path is "${ path }", old path is "${ router[name].$$path }"`);
      }
      return router[name];
    }
    router[name] = new express.Router();
    router[name].$$path = path;
    app.use(path, router[name]);
    return router[name];
  };

  // 注册async function的路由
  const registerAsyncRouter = (name, path) => {
    // eslint-disable-next-line
    path = path || '/';
    if (router[name]) {
      if (router[name].$$path !== path) {
        throw new Error(`register router conflict for "${ name }": new path is "${ path }", old path is "${ router[name].$$path }"`);
      }
      return router[name];
    }
    router[name] = setRouterAsyncable(new express.Router());
    router[name].$$path = path;
    app.use(path, router[name]);
    return router[name];

  };

  // 获取路由
  const getRouter = name => {
    if (!router[name]) {
      throw new Error(`router "${ name }" does not exists`);
    }
    return router[name];
  };

  Object.assign(ref, { $ns: 'express', app, router, getRouter, registerRouter, registerAsyncRouter });

  // 如果 listen=true 则监听端口
  if (config.listen) {
    this.getLogger('init').trace('initExpressModule listen: %s:%s', config.hostname, config.port);
    app.listen(config.port, config.hostname, done);
  }
};

// 返回一个支持async function中间件的router实例
function setRouterAsyncable(router) {
  const asyncMethod = [ 'post', 'get', 'put', 'delete', 'param', 'use', 'all' ];
  for (const key in router) {
    if (asyncMethod.indexOf(key) === -1) {
      continue;
    }
    const fn = router[key];
    router['__' + key] = fn;
    router[key] = (function () {
      const _key = key;
      return function () {
        const args = Array.prototype.slice.call(arguments).map(function (value) {
          return value instanceof Function ? asyncMiddleware(value) : value;
        });
        this['__' + _key].apply(this, args);
      };
    })();
  }
  return router;
}

// 创建异步中间件,遇到reject错误或者throw错误,会自动捕获并且调用express的next(err)进行错误处理
function asyncMiddleware(fn) {
  return function (req, res, next) {
    const args = Array.prototype.slice.call(arguments);
    let p = null;
    try {
      p = fn.apply(null, args) || {};
    } catch (err) {
      return next(err);
    }
    if (p.then && p.catch) {
      p.catch(err => {
        next(err);
      });
    }
  };
}
