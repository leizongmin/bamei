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

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 主机地址
    host: '127.0.0.1',
    // 端口号
    port: 3306,
    // 用户
    user: '',
    // 密码
    password: '',
    // 数据库
    database: '',
    // 连接池大小
    connectionLimit: 5,
    // 其他参考 mysql 模块
  }, config);
};

// 初始化
exports.init = function initMysqlModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initMysqlModule config: %j', config);

  const client = mysql.createPool(config);

  Object.assign(ref, { $ns: 'mysql', client });

  done();

};
