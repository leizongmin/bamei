'use strict';

/**
 * 项目脚手架 express-session-redis 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const initExpressSessionModule = require('bamei-module-express-session').init;
const session = require('bamei-module-express-session').session;
const FileStore = require('session-file-store')(session);

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
    secret: this.getConfigOrDefault('config.express.cookie.secret', ''),
    // 存储引擎，参考 session-file-store 模块
    store: { path: './sessions' },
  }, config);
};

// 初始化
exports.init = function initExpressSessionFileModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressSessionFileModule config: %j', config);

  config.store = new FileStore(config.store);

  initExpressSessionModule.call(this, ref, config, done);

};
