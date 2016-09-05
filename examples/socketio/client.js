const socket = require('socket.io-client')('http://127.0.0.1:4000/aaa');
const readline = require('readline');

const s = require('socket.io-client')('http://127.0.0.1:4000/');
s.emit('bamei', { room: 'aaa' });

socket.on('connect', function (){
  // console.log(s);
});
socket.on('event', function (data){
  console.log(data);
});

socket.on('chat', function (data){
  console.log(data);
});

socket.on('disconnect', function (){

});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveAsyncReadLine = function () {
  rl.question('', function (answer) {
    socket.emit('chat', answer);
    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
