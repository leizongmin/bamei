'use strict';

/**
 * 项目脚手架 express-session-mongo 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const initExpressSessionModule = require('bamei-module-express-session');
const MongoStore = require('connect-mongo')(initExpressSessionModule.session);

/**
 * 配置：
 *   {Boolean} resave 默认 true，参考 bamei-module-express-session
 *   {Boolean} saveUninitialized 默认 true，参考 bamei-module-express-session
 *   {String} secret 默认使用 config.express.cookie.secret 的配置，参考 bamei-module-express-session
 *   {Object} store MongoDB连接配置，默认 { url: 'mongodb://localhost/test-session' }，参考 connect-mongo
 */
module.exports = function initExpressSessionMongoModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    store: { url: 'mongodb://localhost/test-session' },
  }, config);
  this.getLogger('init').info('initExpressSessionMongoModule config: %j', config);

  config.store = new MongoStore(config.store);

  initExpressSessionModule.call(this, ref, config, done);

};
