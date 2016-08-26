'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const utils = require('../utils');

module.exports = function (ctx) {

  // 注册首页的路由
  const router = ctx.get('express').registerRouter('admin', '/');
  // session
  const session = ctx.get('express-session.middleware');

  // 检查登录
  function checkLogin(req, res, next) {
    if (req.session.user && req.session.user.username) {
      res.locals.login_user = req.session.user.username;
      return next();
    }
    res.redirect(`/login?return_url=${ req.url }`);
  }

  router.get('/login', pageLogin);
  router.post('/login', session, pagePostLogin);
  router.get('/logout', session, pageLogut);
  router.get('/blog/:id/edit', session, checkLogin, pageEditBlog);
  router.post('/blog/:id/edit', session, checkLogin, pagePostBlog);
  router.get('/post', session, checkLogin, pageNewPost);
  router.post('/post', session, checkLogin, pagePostBlog);

  // 登录页面
  function pageLogin(req, res) {
    res.render('login');
  }

  function pagePostLogin(req, res) {
    // 检查参数
    req.sanitizeBody('username').trim();
    req.sanitizeBody('password').trim();
    req.checkBody('username', '用户名错误').notEmpty().isLength({ min: 3 });
    req.checkBody('password', '密码错误').notEmpty().isLength({ min: 3 });
    const errors = req.validationErrors();
    if (errors) {
      res.locals.error = errors[0].msg;
      return pageLogin(req, res);
    }
    // 获取设置的用户信息
    const admin = ctx.config.get('site.admin');
    if (admin.username === req.body.username && admin.password === utils.sha1(req.body.password)) {
      // 登录成功
      res.cookie('login_user', admin.username, ctx.config.get('express.cookie'));
      req.session.user = Object.assign({}, admin);
      res.redirect(req.query.return_url || '/');
    } else {
      // 登录失败
      res.locals.error = '用户名或密码错误';
      pageLogin(req, res);
    }
  }

  // 注销登录
  function pageLogut(req, res) {
    req.session.user = null;
    res.clearCookie('login_user');
    res.redirect('/');
  }

  // 编辑文章页面
  function pageEditBlog(req, res, next) {
    ctx.get('service.blog').getById(req.params.id, (err, blog) => {
      if (err) return next(err);
      if (!blog) return next(new Error(`文章不存在`));
      res.locals.blog = blog;
      res.locals.title = '编辑文章';
      res.render('blog_edit');
    });
  }

  // 发表新文章页面
  function pageNewPost(req, res) {
    res.locals.title = '发表新文章';
    res.render('blog_edit');
  }

  function pagePostBlog(req, res, next) {
    const isNew = !req.params.id;
    // 检查参数
    req.sanitizeBody('title').trim();
    req.sanitizeBody('summary').trim();
    req.checkBody('title', '标题不能为空').notEmpty();
    req.checkBody('summary', '简介不能为空').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      res.locals.error = errors[0].msg;
      if (isNew) {
        pageNewPost(req, res);
      } else {
        pageEditBlog(req, res);
      }
      return;
    }
    // 更新
    const data = {
      title: req.body.title,
      summary: req.body.summary,
      updated_at: new Date(),
      content: req.body.content,
    };
    if (isNew) {
      ctx.get('service.blog').create(data, (err, ret) => {
        if (err) return next(err);
        res.redirect(`/blog/${ ret.id }`);
      });
    } else {
      ctx.get('service.blog').updateById(req.params.id, data, err => {
        if (err) return next(err);
        res.redirect(`/blog/${ req.params.id }`);
      });
    }
  }

};
