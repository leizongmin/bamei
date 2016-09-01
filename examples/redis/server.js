'use strict';

const path = require('path');

module.exports = require('bamei').create(function (ctx) {

  ctx.module('redis');
  ctx.module('express');

  ctx.task(path.resolve(__dirname, './services'));
  ctx.task(path.resolve(__dirname, './routes'));

  ctx.init(err => {
    if (err) throw err;
    ctx.catchError();
    ctx.getLogger('init').info('server started');
  });
});
