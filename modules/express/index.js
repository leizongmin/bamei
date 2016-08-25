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

/**
 * 配置：
 *   {Boolean} listen 开始监听端口，默认 true
 *   {Number} port 监听的端口，默认 3000
 *   {String} hostname 监听的地址，默认 0.0.0.0
 *   {String} logLevel http访问日志等级，默认 INFO
 *   {String} publicPrefix 静态资源文件路径前缀，默认 /public
 *   {String} publicDir 静态资源文件目录，默认 ./public
 *   {Object} compression compression 中间件的配置，false 表示关闭，默认 {}
 *   {Object} json json 中间件的配置，false 表示关闭，默认 {}
 *   {Object} urlencoded urlencoded 中间件的配置，false 表示关闭，默认 { extended: false }
 *   {Object} multiparty multiparty 中间件的配置，false 表示关闭，默认 {}
 *   {Object} cookie cookie 中间件的配置，false 表示关闭，默认 { secret: 'hrob8oorrafke11m' }
 *   {Object} validator validator 中间件的配置，false 表示关闭，默认 {}
 *   {Object} favicon favicon文件名，false 表示关闭，默认 false
 *   {String} viewsDir 模板目录，默认 ./views
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    listen: true,
    port: 3000,
    hostname: '0.0.0.0',
    logLevel: 'INFO',
    publicPrefix: '/public',
    publicDir: './public',
    compression: {},
    json: {},
    urlencoded: { extended: false },
    multiparty: {},
    cookie: { secret: 'hrob8oorrafke11m' },
    validator: {},
    favicon: false,
    viewsDir: './views',
  }, config);
};

exports.init = function initExpressModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressModule config: %j', config);

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
    app.use((req, res, next) => {
      onFinished(res, () => {
        logger.trace({ req, res });
      });
      next();
    });
  }
  // favicon
  if (config.favicon) {
    app.use(favicon(config.favicon));
  }
  // 静态资源文件
  app.use(config.publicPrefix, express.static(path.join(__dirname, config.publicDir)));
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

  // 获取路由
  const getRouter = name => {
    if (!router[name]) {
      throw new Error(`router "${ name }" does not exists`);
    }
    return router[name];
  };

  Object.assign(ref, { $ns: 'express', app, router, getRouter, registerRouter });

  // 如果 listen=true 则监听端口
  if (config.listen) {
    this.getLogger('init').info('initExpressModule listen: %s:%s', config.hostname, config.port);
    app.listen(config.port, config.hostname, done);
  }
};
