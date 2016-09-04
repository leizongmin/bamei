var app = angular.module('ChatRoomApp', ['ngMaterial', 'ui.router', 'ngMessages']);

app.config(
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
            ;
        }
    ]
);