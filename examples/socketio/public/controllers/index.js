app.controller('MainController', function($scope) {

}).controller('IndexController', function($scope) {

}).controller('ChatController', function($scope, $state, $stateParams) {
  $scope.room = $stateParams.room;
  console.log('room: ' + $scope.room);
});