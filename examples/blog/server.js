'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const utils = require('./utils');

module.exports = require('bamei').create(function (ctx) {

  // 初始化模块
  ctx.module('express', ref => {
    // 模板中使用配置信息
    ref.app.locals.site = ctx.config.get('site');
  });
  // session 使用 redis 存储
  ctx.module('express-session-redis');
  // 使用 nunjucks 模板引擎
  ctx.module('express-engine-nunjucks');
  // 使用 mysql
  ctx.module('mysql');
  // 使用 redis
  ctx.module('redis');

  // 注册模板自定义 filter
  ctx.task(path.resolve(__dirname, './init/tpl_filters.js'));
  // 注册 services
  ctx.task(path.resolve(__dirname, './services'));
  // 注册 routes
  ctx.task(path.resolve(__dirname, './routes'));
  // 错误页面
  ctx.task(() => {
    ctx.get('express.app').use(function pageError(err, req, res, _next) {
      res.render('error', {
        error: {
          message: err.message,
          stack: utils.replaceRealPath(err.stack),
        },
      });
    });
  });

  // 开始初始化
  ctx.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    ctx.catchError();

    ctx.getLogger('init').info('server started');
  });
});
