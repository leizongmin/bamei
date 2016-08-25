'use strict';

/**
 * 项目脚手架 express-engine-nunjucks 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {
  'express': '*',
};

/**
 * 配置（其他参考 nunjucks 模块）：
 *   {Boolean} autoescape 自动转义输出的变量，默认 true
 *   {Boolean} watch 监听文件变化，有更新时自动重载，默认 true
 *   {Boolean} throwOnUndefined 当变量是undefined时抛出异常，默认 false
 *   {Boolean} trimBlocks 删除标签空行，默认 false
 *   {Boolean} lstripBlocks 删除标签左边的空格，默认 false
 *   {Boolean} noCache 不使用缓存，默认 false
 *   {String} viewsDir 模板引擎目录，默认 this.get('express.app').get('views')
 *   {Object} express express实例，默认 this.get('express.app')
 */
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    autoescape: true,
    watch: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    noCache: true,
    viewsDir: this.get('express.app').get('views'),
    express: this.get('express.app'),
  }, config);
};

exports.init = function initExpressEngineNunjucksModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initExpressEngineNunjucksModule config: %j', config);

  nunjucks.configure(config.viewsDir, config);

  Object.assign(ref, { $ns: 'express-engine-nunjucks' });

  done();

};
