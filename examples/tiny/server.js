'use strict';

const path = require('path');

module.exports = require('bamei').create(function (ctx) {
  // 加载express模块
  ctx.module('express');
  // 加载express路由
  ctx.task(path.resolve(__dirname, './routes'));
  // 开始初始化
  ctx.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    ctx.catchError();

    ctx.getLogger('init').info('server started');
  });
});
