'use strict';

/**
 * 项目脚手架 sqlite 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

/**
 * 配置（其他参数 sqlite3 模块）：
 *   {String} filename 文件名，默认 :memory:
 *   {String} mode 打开模式，默认 READWRITE|CREATE
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    filename: ':memory:',
    mode: 'READWRITE|CREATE',
  }, config);
};

exports.init = function initSqliteModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initSqliteModule config: %j', config);

  const client = new sqlite3.Database(config.filename, getOpenMode(config.mode), done);

  Object.assign(ref, { $ns: 'sqlite', client });

};

// 得到打开模式
function getOpenMode(mode) {
  let ret = 0;
  mode.toUpperCase().split('|').forEach(m => {
    ret = ret | sqlite3[`OPEN_${ m }`];
  });
  return ret;
}
