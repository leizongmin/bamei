'use strict';

/**
 * 项目脚手架 express-session-memcached 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const initExpressSessionModule = require('bamei-module-express-session').init;
const session = require('bamei-module-express-session').session;
const MemcachedStore = require('connect-memcached')(session);

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {
  'express': '*',
};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 参考 express-session 模块
    resave: true,
    // 参考 express-session 模块
    saveUninitialized: true,
    // 安全密钥，参考 express-session 模块
    secret: this.getConfigOrDefault('express.cookie.secret', ''),
    // 存储引擎，参考 connect-memcached 模块
    store: { hosts: [ '127.0.0.1:11211' ]},
  }, config);
};

// 初始化
exports.init = function initExpressSessionMemcachedModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressSessionMemcachedModule config: %j', config);

  config.store = new MemcachedStore(config.store);

  initExpressSessionModule.call(this, ref, config, done);

};
