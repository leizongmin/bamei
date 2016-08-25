'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const utils = require('../utils');

module.exports = function () {

  // 当前项目对象
  const $p = this;
  // 注册首页的路由
  const router = $p.get('express').registerRouter('home', '/');

  // 错误页面
  setImmediate(() => {
    router.use(function (err, req, res, _next) {
      res.render('error', {
        error: {
          message: err.message,
          stack: utils.replaceRealPath(err.stack),
        },
      });
    });
  });

  // 首页
  router.get('/', function (req, res, next) {
    // $p.get('service.blog').getList(req.query, (err, list) => {

    // });
    next(new Error('just for test'));
  });

};
