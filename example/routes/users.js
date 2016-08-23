'use strict';

/**
 * 项目脚手架例子
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function () {

  const router = this.get('express.router');
  const mysql = this.get('knex-mysql.client');

  router.get('/', function (req, res, next) {
    mysql.raw('show tables').asCallback((err, ret) => {
      if (err) return next(err);
      res.send(ret);
    });
  });

};
