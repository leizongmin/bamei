'use strict';

/**
 * 项目脚手架 knex 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const knex = require('knex');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 客户端类型：mysql, pg, sqlite3, mssql，必填
    // client: '',
    // 连接信息，默认 {}
    connection: {},
    // 连接池
    pool: { min: 0, max: 5 },
  }, config);
};

// 初始化
exports.init = function initKnexModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initKnexModule config: %j', config);

  if (!config.client) {
    return done(new Error(`missing option "client"`));
  }

  // 创建连接
  const client = knex(config);

  Object.assign(ref, { $ns: 'knex', client });

  done();

};
