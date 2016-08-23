'use strict';

/**
 * 项目脚手架 express 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const initKnexModule = require('bamei-module-knex');

/**
 * 配置：
 *   {Object} connection 连接信息，默认 {}，参考 module-knex
 *   {Object} pool 连接池，默认 { min: 0, max: 5 }，参考 module-knex
 */
module.exports = function initKnexMySQLModule(ref, config, done) {

  initKnexModule.call(this, ref, Object.assign({ client: 'mysql' }, config), done);

};
