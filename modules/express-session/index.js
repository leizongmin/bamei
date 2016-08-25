'use strict';

/**
 * 项目脚手架 express-session 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const expressSession = require('express-session');

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
    // 存储引擎，参考 express-session 模块
    store: null,
  }, config);
};

// 初始化
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
