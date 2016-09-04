var app = angular.module('ChatRoomApp', ['ngMaterial', 'ui.router', 'ngMessages', 'btford.socket-io']);

app.factory('socketio', function (socketFactory) {
  return socketFactory();
}).config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            // $locationProvider.html5Mode(true);
            $urlRouterProvider
                // .when('/', '/home/index')
                .otherwise('/');

            $stateProvider
                .state('index', {
                    url: '/',
                    controller: 'IndexController',
                    templateUrl: '/public/views/index.html'
                })
                .state('chat', {
                    url: '/:room',
                    controller: 'ChatController',
                    templateUrl: '/public/views/chat.html'
                })
            ;
        }
    ]
);