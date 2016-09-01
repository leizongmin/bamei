/**
 * Created by joneszhu on 16/9/1.
 */
'use strict';
// 开发环境无需编译即可直接运行es7的async/await语法特性,生产环境官方建议使用babel编译之后的代码.
if (process.env.NODE_ENV === 'development') require('babel-register');
// 为nodejs提供sourcemap支持
else require('source-map-support').install({ environment: 'node', handleUncaughtExceptions: false });

const path = require('path');

module.exports = require('bamei').create(function (ctx) {

  // 初始化模块
  ctx.module('express');

  // 加载路由
  ctx.task(path.resolve(__dirname, './routes'));

  // express路由层的错误处理
  ctx.task(() => {
    ctx.get('express.app').use(function expressError(err, req, res, _next) {
      ctx.getLogger('expErr').error(err);
      res.status(500).end('Ops! Something wrong!');
    });
  });

  // 开始初始化
  ctx.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    ctx.catchError();

    ctx.getLogger('init').info(`server started at ${ ctx.config.get('express.port') }`);

  });
});
