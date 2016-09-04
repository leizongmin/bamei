'use strict';

const path = require('path');

module.exports = function (ctx) {

  // const io = ctx.get('socketio.io');
  // console.log('ZZZ');
  // const rooms = {};

  // const createNameSpace = (nameSpace = 'default') => {
  //   if(rooms[nameSpace]) {
  //     return;
  //   }

  //   const broadcast = (socket, data) => {
  //     socket.broadcast.emit(data);
  //   };

  //   const nsp = io.of('/' + nameSpace);
  //   console.log('GGG');
  //   nsp.on('connection', socket => {
  //     console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
  //     rooms[nameSpace] = true;
  //     socket.emit('chat', `hello ${ socket.conn.id }`);
  //     socket.on('chat', data => {
  //       console.log(`receive message: ${ data }`);
  //       broadcast(socket, '[' + data + ']');
  //     });
  //   });
  // };

  // createNameSpace('aaa');

  // io.on('connection', socket => {
  //   console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
  //   socket.emit('bamei', `hello ${ socket.conn.id }`);
  //   socket.on('bamei', data => {
  //     console.log(`receive message: ${ data }`);
  //   });
  // });

  // const nsp = io.of('/myNameSpace');

  // nsp.on('connection', socket => {
  //   console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
  //   socket.emit('bamei', `hello ${ socket.conn.id }`);
  //   socket.on('bamei', data => {
  //     console.log(`receive message: ${ data }`);
  //   });
  // });

};
