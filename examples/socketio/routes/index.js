'use strict';

const path = require('path');

module.exports = function (ctx) {

  const router = ctx.get('express').registerRouter('index', '/');

  const render = (req, res) => {
    res.render('index', {
      'controllers': [
        '/public/controllers/index.js'
      ],
      'routes': [
        '/public/routes/index.js'
      ]
    });
  };

  router.get('/', render);

  const io = ctx.get('socketio.io');
  io.on('connection', socket => {
    console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
    socket.emit('bamei', `hello ${ socket.conn.id }`);
    socket.on('bamei', data => {
      console.log(`receive message: ${ data }`);
    });
  });
};
