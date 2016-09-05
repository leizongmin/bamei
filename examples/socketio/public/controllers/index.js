app.controller('MainController', function ($scope) {

}).controller('IndexController', function ($scope) {

}).controller('ChatController', function ($scope, $state, $stateParams) {
  $scope.chat = {};
  $scope.room = $stateParams.room;

  $scope.sendMessage = function () {
    console.log($scope.chat.data);
    $scope.chat.data = '';
  };
  
  $scope.enterKeypress = function (e) {
    if(e.keyCode === 13) {
        $scope.sendMessage();
    }
  };
});