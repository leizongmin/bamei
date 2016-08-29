'use strict';

module.exports = function (ctx) {

  // 注册首页的路由
  const router = ctx.get('express').registerRouter('index', '/');

  const hw = (req, res) => {
    res.send('Hello world!');
  };

  router.get('/', hw);

};
