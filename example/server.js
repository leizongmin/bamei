'use strict';

/**
 * 项目脚手架例子
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const bamei = require('bamei');

const $p = bamei.create();

// 初始化 knex-mysql 模块
$p.module('knex-mysql');

// 初始化 express 模块
$p.module('express');

// 载入路由程序
$p.init.load('./routes');

// 完成初始化
$p.init(function (err) {
  if (err) throw err;

  // 开启全局错误捕获
  $p.catchError();

  console.log($p.config.all());
  $p.getLogger('init').info('server started');
});
