'use strict';

/**
 * 项目脚手架 express-session-memcached 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const initExpressSessionModule = require('bamei-module-express-session');
const MemcachedStore = require('connect-memcached')(initExpressSessionModule.session);

/**
 * 配置：
 *   {Boolean} resave 默认 true，参考 bamei-module-express-session
 *   {Boolean} saveUninitialized 默认 true，参考 bamei-module-express-session
 *   {String} secret 默认使用 config.express.cookie.secret 的配置，参考 bamei-module-express-session
 *   {Object} store Memcached连接配置，默认 { hosts: [ '127.0.0.1:11211' ]}，参考 connect-memcached
 */
module.exports = function initExpressSessionMemcachedModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    store: { hosts: [ '127.0.0.1:11211' ]},
  }, config);
  this.getLogger('init').info('initExpressSessionMemcachedModule config: %j', config);

  config.store = new MemcachedStore(config.store);

  initExpressSessionModule.call(this, ref, config, done);

};
