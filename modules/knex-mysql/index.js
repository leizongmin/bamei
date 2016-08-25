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

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  // 参考 bamei-module-knex 模块
  return config;
};

// 初始化
exports.init = function initKnexMySQLModule(ref, config, done) {

  initKnexModule.call(this, ref, Object.assign({ client: 'mysql' }, config), done);

};
