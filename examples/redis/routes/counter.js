'use strict';

module.exports = function (ctx) {
  const router = ctx.get('express').registerRouter('counter', '/counter');

  const counter = ctx.get('counter');

  router.get('/', (req, res) => {
    const name = req.query.name;
    const number = req.query.number;
    const width = req.query.width;
    counter(name, +number, +width).then(success => {
      res.send(success);
    }).catch(error => {
      res.send(error);
    });
  });

};
