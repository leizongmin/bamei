const socket = require('socket.io-client')('http://127.0.0.1:4000');
socket.on('connect', function (){

});
socket.on('event', function (data){
  console.log(data);
});

socket.on('bamei', function (data){
  console.log(data);
});

socket.on('disconnect', function (){

});
