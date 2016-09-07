app.controller('MainController', function ($scope) {

}).controller('IndexController', function ($scope) {

}).controller('ChatController', function ($scope, $state, $stateParams, $location, $anchorScroll) {
  $scope.chat = {
    data: '',
    message: [],
  };
  $scope.room = $stateParams.room;

  var scrollBottom = function () {
    $location.hash('bottom');
    $anchorScroll();
  };

  var socket;

  var connectToRoom = function () {
    socket = io.connect('/' + $scope.room);
    socket.on('chat', function (data) {
      $scope.$apply(function () {
        data.time = new Date();
        $scope.chat.message.push(data);
        scrollBottom();
      });
    });
  };

  $scope.sendMessage = function () {
    if(!socket) {return;}
    if(!$scope.chat.data) {return;}
    socket.emit('chat', $scope.chat.data);
    var data = {};
    data.data = angular.copy($scope.chat.data)
    data.time = new Date();
    data.id = 'self';
    $scope.chat.message.push(data);
    $scope.chat.data = '';
    scrollBottom();
  };
  
  $scope.enterKeypress = function (e) {
    if(e.keyCode === 13) {
        $scope.sendMessage();
    }
  };

  var createRoom = io.connect('/');
  createRoom.on('connect', function() {
    createRoom.emit('bamei', {room: $scope.room});
    createRoom.on('bamei', function(data) {
      if(data === 'success') {
        socket && socket.disconnect && socket.disconnect();
        connectToRoom();
      }
    });
  });
});