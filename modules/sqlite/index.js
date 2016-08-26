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

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 文件名
    filename: ':memory:',
    // 打开模式
    mode: 'READWRITE|CREATE',
    // 其他参考 sqlite3 模块
  }, config);
};

// 初始化
exports.init = function initSqliteModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initSqliteModule config: %j', config);

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
