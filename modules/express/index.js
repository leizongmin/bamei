'use strict';

/**
 * 项目脚手架 express 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const compression = require('compression');
const expressValidator = require('express-validator');
const onFinished = require('on-finished');

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
 */
module.exports = function initExpressModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
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
  }, config);
  this.getLogger('init').info('initExpressModule config: %j', config);

  const app = express();

  // 端口
  app.set('port', config.port);
  // 模板引擎
  app.set('view engine', 'html');
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

  // 路由
  const router = new express.Router();
  app.use(router);

  Object.assign(ref, { $ns: 'express', app, router });

  // 如果 listen=true 则监听端口
  if (config.listen) {
    this.getLogger('init').info('initExpressModule listen: %s:%s', config.hostname, config.port);
    app.listen(config.port, config.hostname, done);
  }
};
