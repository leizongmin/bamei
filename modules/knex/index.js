'use strict';

/**
 * 项目脚手架 express 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const knex = require('knex');

/**
 * 配置：
 *   {String} client 客户端类型：mysql, pg, sqlite3, mssql，必填
 *   {Object} connection 连接信息，默认 {}
 *   {Object} pool 连接池，默认 { min: 0, max: 5 }
 */
module.exports = function initKnexModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    connection: {},
    pool: { min: 0, max: 5 },
  }, config);
  this.getLogger('init').info('initKnexModule config: %j', config);

  if (!config.client) {
    return done(new Error(`missing option "client"`));
  }

  // 创建连接
  const client = knex(config);

  Object.assign(ref, { $ns: 'knex', client });

  done();

};
