'use strict';

/**
 * 项目脚手架例子
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function () {

  const router = this.get('express').registerRouter('home');
  const mysql = this.get('knex.client');
  const session = this.get('express-session.middleware');

  router.get('/', session, function (req, res, next) {
    if (req.session.count > 0) {
      req.session.count += 1;
    } else {
      req.session.count = 1;
    }
    mysql.raw('show tables').asCallback((err, ret) => {
      if (err) return next(err);
      res.send({
        session: req.session,
        data: ret,
      });
    });
  });

  router.get('/hello', function (req, res) {
    res.render('hello', { message: `现在是北京时间${ new Date() }` });
  });

};
