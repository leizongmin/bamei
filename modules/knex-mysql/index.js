'use strict';

/**
 * 项目脚手架 express 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const initKnexModule = require('bamei-module-knex').init;

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

/**
 * 配置：
 *   {Object} connection 连接信息，默认 {}，参考 bamei-module-knex
 *   {Object} pool 连接池，默认 { min: 0, max: 5 }，参考 bamei-module-knex
 */
exports.config = function fillDefaultConfig(config) {
  return config;
};

exports.init = function initKnexMySQLModule(ref, config, done) {

  initKnexModule.call(this, ref, Object.assign({ client: 'mysql' }, config), done);

};
