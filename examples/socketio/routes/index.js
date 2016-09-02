'use strict';

module.exports = function (ctx) {

  const io = ctx.get('socketio.io');

  io.on('connection', socket => {
    console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
    socket.emit('bamei', `hello ${ socket.conn.id }`);
    socket.on('bamei', data => {
      console.log(`receive message: ${ data }`);
    });
  });

  const nsp = io.of('/myNameSpace');

  nsp.on('connection', socket => {
    console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
    socket.emit('bamei', `hello ${ socket.conn.id }`);
    socket.on('bamei', data => {
      console.log(`receive message: ${ data }`);
    });
  });
};
