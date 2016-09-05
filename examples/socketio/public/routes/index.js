var app = angular.module('ChatRoomApp', ['ngMaterial', 'ui.router', 'ngMessages', 'btford.socket-io']);

app.config(
  ['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);
      $urlRouterProvider
        .otherwise('/default');

      $stateProvider
        .state('chat', {
          url: '/:room',
          controller: 'ChatController',
          templateUrl: '/public/views/chat.html',
        });
    }
  ]
);