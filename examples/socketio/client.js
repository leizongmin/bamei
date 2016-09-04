const socket = require('socket.io-client')('http://127.0.0.1:4000/');
const readline = require('readline');

socket.on('connect', function (s){
  console.log(s);
});
socket.on('event', function (data){
  console.log(data);
});

socket.on('bamei', function (data){
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
    socket.emit('bamei', answer);
    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
