'use strict';

/**
 * 项目脚手架 express-session-redis 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const initExpressSessionModule = require('bamei-module-express-session').init;
const session = require('bamei-module-express-session').session;
const RedisStore = require('connect-redis')(session);

/**
 * 配置：
 *   {Boolean} resave 默认 true，参考 bamei-module-express-session
 *   {Boolean} saveUninitialized 默认 true，参考 bamei-module-express-session
 *   {String} secret 默认使用 config.express.cookie.secret 的配置，参考 bamei-module-express-session
 *   {Object} store Redis连接配置，默认 {}，参考 connect-redis
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    store: {},
  }, config);
};

exports.init = function initExpressSessionRedisModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressSessionRedisModule config: %j', config);

  config.store = new RedisStore(config.store);

  initExpressSessionModule.call(this, ref, config, done);

};
