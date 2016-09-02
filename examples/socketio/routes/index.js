'use strict';

module.exports = function (ctx) {

  const io = ctx.get('socketio.io');

  io.on('connection', function (socket){
    socket.emit('bamei', 'hello');
  });
};
