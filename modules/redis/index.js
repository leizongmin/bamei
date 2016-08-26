'use strict';

/**
 * 项目脚手架 redis 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const Redis = require('ioredis');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 服务器地址
    host: '127.0.0.1',
    // 服务器端口
    port: 6379,
    // 数据库号
    db: 0,
    // 其他参考 redis 模块
  }, config);
};

// 初始化
exports.init = function initRedisModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initRedisModule config: %j', config);

  // 创建客户端
  const client = new Redis(config);

  Object.assign(ref, { $ns: 'redis', client });

  done();

};
