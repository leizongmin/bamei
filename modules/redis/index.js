'use strict';

/**
 * 项目脚手架 redis 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const Redis = require('ioredis');

/**
 * 配置：（其他参考 ioredis 模块）
 *   {String} host 服务器地址，默认 127.0.0.1
 *   {Number} port 服务器端口，默认 6379
 *   {Number} db 数据库号码，默认 0
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  }, config);
};

exports.init = function initRedisModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initRedisModule config: %j', config);

  // 创建客户端
  const client = new Redis(config);

  Object.assign(ref, { $ns: 'redis', client });

  done();

};
