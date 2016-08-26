'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ctx) {

  // 注册首页的路由
  const router = ctx.get('express').registerRouter('home', '/');

  // 设置当前登录用户
  function getLoginInfo(req, res, next) {
    res.locals.login_user = req.cookies.login_user;
    next();
  }

  router.get('/', getLoginInfo, pageHome);
  router.get('/blog/:id', getLoginInfo, pageBlog);

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
