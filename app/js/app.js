'use strict';

var foodMeApp = angular.module('foodMeApp', ['ngResource']);//, 'google-maps']);

foodMeApp.config(function ($routeProvider, $locationProvider) {
 $locationProvider.hashPrefix('!');
 $locationProvider.html5Mode(true);
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
        when("/courier-account/order/:id", { 
          controller: "OrderDetailsController",
          templateUrl: "views/order-details.html" 
      }).
         when("/courier-account/map/:id", { 
          controller: "MapController",
          templateUrl: "views/map.html" 
      }).
    /*   when('/order-details', {
        controller: 'OrderDetailsController',
        templateUrl: 'views/order-details.html'
      }).*/
        when('/show-map', {
        controller: 'MapController',
        templateUrl: 'views/show-map.html'
      }).
         when('/logout', {
        controller: 'LogoutController',
        templateUrl: 'views/logout.html'
      }).
        otherwise({
          redirectTo: '/login'
        });
       
});