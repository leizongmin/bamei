app.controller('MainController', function ($scope) {

}).controller('IndexController', function ($scope) {

}).controller('ChatController', function ($scope, $state, $stateParams) {
  $scope.chat = {
    data: '',
    message: [],
  };
  $scope.room = $stateParams.room;

  var socket = io.connect('http://127.0.0.1:4000/' + $scope.room);
  socket.on('chat', function (data) {
    $scope.$apply(function () {
      console.log(data);
      data.time = new Date();
      $scope.chat.message.push(data);
    });
  });

  $scope.sendMessage = function () {
    socket.emit('chat', $scope.chat.data);
    var data = {};
    data.data = angular.copy($scope.chat.data)
    data.time = new Date();
    data.id = 'self';
    $scope.chat.message.push(data);
    $scope.chat.data = '';
  };
  
  $scope.enterKeypress = function (e) {
    if(e.keyCode === 13) {
        $scope.sendMessage();
    }
  };

  var createRoom = io.connect('http://127.0.0.1:4000');
  createRoom.emit('bamei', {room: $scope.room});
});