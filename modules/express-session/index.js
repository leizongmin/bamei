'use strict';

/**
 * 项目脚手架 express-session 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const expressSession = require('express-session');

/**
 * 配置（其他参考 express-session 模块）：
 *   {Boolean} resave 默认 true
 *   {Boolean} saveUninitialized 默认 true
 *   {String} secret 默认使用 config.express.cookie.secret 的配置
 *   {Object} store 存储引擎，默认 null
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    store: null,
  }, config);
};

exports.init = function initExpressSessionModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressSessionModule config: %j', config);

  const middleware = expressSession(config);

  Object.assign(ref, { $ns: 'express-session', middleware });

  done();

};

exports.session = expressSession;
