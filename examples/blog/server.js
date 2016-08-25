'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');

module.exports = require('bamei').create(function () {

  // 初始化模块
  this.module('express', ref => {
    // 模板中使用配置信息
    ref.app.locals.site = this.config.get('site');
  });
  // session 使用 redis 存储
  this.module('express-session-redis');
  // 使用 nunjucks 模板引擎
  this.module('express-engine-nunjucks');
  // 使用 mysql
  this.module('mysql');
  // 使用 redis
  this.module('redis');

  // 注册模板自定义 filter
  this.task(path.resolve(__dirname, './init/tpl_filters.js'));
  // 注册 services
  this.task(path.resolve(__dirname, './services'));
  // 注册 routes
  this.task(path.resolve(__dirname, './routes'));

  this.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    this.catchError();

    this.getLogger('init').info('server started');
  });
});
