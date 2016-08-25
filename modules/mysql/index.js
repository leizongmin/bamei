'use strict';

/**
 * 项目脚手架 mysql 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

/**
 * 配置：（其他参考 mysql 模块）
 *   {String} host 主机地址，默认 127.0.0.1
 *   {Number} port 端口号，默认 3306
 *   {String} user 用户，默认 ''
 *   {String} password 端口，默认 ''
 *   {String} database 数据库，默认 ''
 *   {Number} connectionLimit 连接池大小，默认 5
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    host: '127.0.0.1',
    port: 3306,
    user: '',
    password: '',
    database: '',
    connectionLimit: 5,
  }, config);
};

exports.init = function initMysqlModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initMysqlModule config: %j', config);

  const client = mysql.createPool(config);

  Object.assign(ref, { $ns: 'mysql', client });

  done();

};
