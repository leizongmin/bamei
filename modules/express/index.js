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
 */
module.exports = function initExpressModule(ref, config, done) {

  // 默认配置
  Object.assign(config, {
    listen: true,
    port: 3000,
    hostname: '0.0.0.0',
    logLevel: 'INFO',
    publicPrefix: '/public',
    publicDir: './public',
  });
  this.getLogger('init').info('initExpressModule config: %j', config);

  const app = express();
  Object.assign(ref, { app });

  app.set('view engine', 'html');
  app.set('port', config.port);
  app.use(compression());
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
        logger.info({ req, res });
      });
      next();
    });
  }
  // body解析
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(multiparty());
  // express-validator
  app.use(expressValidator());
  // cookie解析
  app.use(cookieParser());
  // 静态资源文件
  app.use(config.publicPrefix, express.static(path.join(__dirname, config.publicDir)));

  if (config.listen) {
    this.getLogger('init').info('initExpressModule listen: %s:%s', config.hostname, config.port);
    app.listen(config.port, config.hostname, done);
  }

};
