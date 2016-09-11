'use strict';

module.exports = function (ctx) {

  const io = ctx.get('socketio.io');
  const rooms = {};

  const createNameSpace = (nameSpace = 'default') => {
    if(rooms[nameSpace]) {
      return;
    }

    const broadcast = (socket, data) => {
      socket.broadcast.emit('chat', data);
    };

    console.log('create room: ' + nameSpace);

    const nsp = io.of('/' + nameSpace);
    nsp.on('connection', socket => {
      console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
      rooms[nameSpace] = true;
      socket.on('chat', data => {
        console.log(`receive message: ${ data }`);
        broadcast(socket, { id: socket.conn.id, data });
      });
    });
  };


  io.on('connection', socket => {
    console.log(`new connection, namespace: ${ socket.nsp.name }, id: ${ socket.conn.id }`);
    // socket.emit('bamei', `hello ${ socket.conn.id }`);
    socket.on('bamei', data => {
      // console.log(`receive message: ${ data }`);
      if(data.room) {
        createNameSpace(data.room);
        socket.emit('bamei', 'success');
      }
    });
  });

};
