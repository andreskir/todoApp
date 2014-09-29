'use strict';

angular
  .module('todoAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (localStorageService) {
    if(!localStorageService.get('tasks')){
      localStorageService.set('tasks',[]);
    }
  });

