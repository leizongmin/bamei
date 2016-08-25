'use strict';

/**
 * 项目脚手架 ${name} 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

/**
 * 配置：
 *   {Object} connection 连接信息，默认 {}，参考 bamei-module-knex
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 默认配置
  }, config);
};

exports.init = function init${Name}Module(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('init${Name}Module config: %j', config);

  const client = { message: 'hello, world' };

  Object.assign(ref, { $ns: '${name}', client });

  done();

};
