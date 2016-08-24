'use strict';

/**
 * 项目脚手架 sqlite 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const sqlite3 = require('sqlite3');

/**
 * 配置（其他参数 sqlite3 模块）：
 *   {String} filename 文件名，默认 :memory:
 *   {String} mode 打开模式，默认 READWRITE|CREATE
 */
module.exports = function initSqliteModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = Object.assign({
    filename: ':memory:',
    mode: 'READWRITE|CREATE',
  }, config);
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
