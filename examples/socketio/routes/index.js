'use strict';

// const path = require('path');

module.exports = function (ctx) {

  const router = ctx.get('express').registerRouter('index', '/');

  const render = (req, res) => {
    res.render('index', {
      'controllers': [
        '/public/controllers/index.js',
      ],
      'routes': [
        '/public/routes/index.js',
      ],
    });
  };

  router.get('/', render);
};
