'use strict';

/**
 * 项目脚手架 express-session-redis 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const initExpressSessionModule = require('bamei-module-express-session');
const RedisStore = require('connect-redis')(initExpressSessionModule.session);

/**
 * 配置：
 *   {Boolean} resave 默认 true，参考 bamei-module-express-session
 *   {Boolean} saveUninitialized 默认 true，参考 bamei-module-express-session
 *   {String} secret 默认使用 config.express.cookie.secret 的配置，参考 bamei-module-express-session
 *   {Object} redis Redis连接配置，默认 {}，参考 connect-redis
 */
module.exports = function initExpressSessionRedisModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    redis: {},
  }, config);
  this.getLogger('init').info('initExpressSessionRedisModule config: %j', config);

  config.store = new RedisStore(config.redis);
  delete config.redis;

  initExpressSessionModule.call(this, ref, config, done);

};
