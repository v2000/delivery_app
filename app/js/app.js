'use strict';

var foodMeApp = angular.module('foodMeApp', ['ngResource']);



foodMeApp.config(function ($locationProvider) {
 $locationProvider.html5Mode(true);
})



.config(function($routeProvider) {

  $routeProvider.
   /*when('/', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      }).*/
    when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      }).
       when('/courier-account', {
        controller: 'CourierAccountController',
        templateUrl: 'views/courier-account.html'
      }).
      when('/logout', {
        controller: 'LogoutController',
        templateUrl: 'views/logout.html'
      }).
       when('/order-details', {
        controller: 'OrderDetailsController',
        templateUrl: 'views/order-details.html'
      }).
        when('/map', {
        controller: 'MapController',
        templateUrl: 'views/map.html'
      }).
        otherwise({
          redirectTo: '/login'
        });
       
});
