'use strict';

/**
 * 项目脚手架 mysql 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const mysql = require('mysql');

/**
 * 配置：（其他参考 mysql 模块）
 *   {String} host 主机地址，默认 127.0.0.1
 *   {Number} port 端口号，默认 3306
 *   {String} user 用户，默认 ''
 *   {String} password 端口，默认 ''
 *   {String} database 数据库，默认 ''
 *   {Number} connectionLimit 连接池大小，默认 5
 */
module.exports = function initMysqlModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    host: '127.0.0.1',
    port: 3306,
    user: '',
    password: '',
    database: '',
    connectionLimit: 5,
  }, config);
  this.getLogger('init').info('initMysqlModule config: %j', config);

  const client = mysql.createPool(config);

  Object.assign(ref, { $ns: 'mysql', client });

  done();

};