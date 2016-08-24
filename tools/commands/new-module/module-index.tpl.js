'use strict';

/**
 * 项目脚手架 ${name} 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

/**
 * 配置：
 *   {Object} connection 连接信息，默认 {}，参考 bamei-module-knex
 *   {Object} pool 连接池，默认 { min: 0, max: 5 }，参考 bamei-module-knex
 */
module.exports = function init${Name}Module(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({

  }, config);
  this.getLogger('init').info('init${Name}Module config: %j', config);

  const client = { message: 'hello, world' };

  Object.assign(ref, { $ns: '${name}', client });

  done();

};