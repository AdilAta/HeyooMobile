// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//angular.module('starter.controllers', ['ionic']);
//angular.module('starter.directives', ['ionic']);
//angular.module('starter.services', ['ionic']);


//import loginCtrl from 'controllers/login.js';
//import loginService from 'services/login.js';



angular.module('starter', ['ionic'])

  //  .service ('loginService', loginService)


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider


        .state('userManagement', {
            url: '/userManagement',
            templateUrl: 'templates/user/userManagement.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/user/login.html',
           // controller: 'loginCtrl'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'templates/user/registration.html'
          //  controller: 'registrationCtrl'
        })

        .state('about', {
            url: '/registration',
            templateUrl: 'templates/user/registration.html'
        })

        $urlRouterProvider.otherwise('/userManagement');
});

