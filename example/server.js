'use strict';

/**
 * 项目脚手架例子
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const bamei = require('bamei');

const $p = bamei.create();

// 初始化 express 模块，从 config.web 中读取配置
$p.module('express');

$p.init.add(() => {
  $p.get('express.router').get('/', function (req, res) {
    res.send(new Date());
    process.nextTick(() => {
      const err = new Error('haha');
      err.code = 'UUU';
      throw err;
    });
  });
});

// 完成初始化
$p.init(function (err) {
  if (err) throw err;

  // 开启全局错误捕获
  $p.catchError();

  console.log($p.config.all());
  console.log('done');
});
