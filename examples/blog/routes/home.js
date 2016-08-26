'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const utils = require('../utils');

module.exports = function (ctx) {

  // 注册首页的路由
  const router = ctx.get('express').registerRouter('home', '/');

  router.get('/', pageHome);
  router.get('/blog/:id', pageBlog);

  // 错误页面
  router.use(function pageError(err, req, res, _next) {
    res.render('error', {
      error: {
        message: err.message,
        stack: utils.replaceRealPath(err.stack),
      },
    });
  });

  // 首页
  function pageHome(req, res, next) {
    ctx.get('service.blog').getList(req.query, (err, list) => {
      if (err) return next(err);
      res.locals.list = list;
      res.render('home');
    });
  }

  // 文章页面
  function pageBlog(req, res, next) {
    ctx.get('service.blog').getById(req.params.id, (err, blog) => {
      if (err) return next(err);
      res.locals.blog = blog;
      res.render('blog');
    });
  }

};
