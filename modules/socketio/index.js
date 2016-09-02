'use strict';

/**
 * 项目脚手架 socketio 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 默认配置
  }, config);
};

// 初始化
exports.init = function initSocketioModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initSocketioModule config: %j', config);

  const client = { message: 'hello, world' };

  Object.assign(ref, { $ns: 'socketio', client });

  done();

};
