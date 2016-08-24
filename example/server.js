'use strict';

/**
 * 项目脚手架例子
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = require('bamei').create(function () {

  // 初始化 knex-mysql 模块
  this.module('knex-mysql');

  // 初始化 express 模块
  this.module('express');
  this.module('express-session-redis');
  this.module('redis');

  // 载入路由程序
  this.task('./routes');

  // 其他任务
  this.task(() => {
    console.log('hello, world');
    this.get('redis.client').keys('*', console.log);
  });

  // 完成初始化
  this.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    this.catchError();

    console.log(this.config.all());
    this.getLogger('init').info('server started');
  });

});
