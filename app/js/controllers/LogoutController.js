'use strict';

foodMeApp.controller('LogoutController',
    function LogoutController($scope, $http, $location, UserService) {



//var a = $('<li ng-class="{active: routeIs('/logout')}"><a href="login">Logout</a></li>').appendTo('body');


console.log("LogoutController");

 
  /*  var a = $('<div id="#accordionTest"/>').appendTo('body');

    for(var i = 1; i <= 5; i++){
      a.append('<h4>Section ' + i + '</h4><div></div>');
    }*/



    $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
 //       console.log('get user response', data);
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
      });
      
    $scope.logout = function($scope){
      UserService.logOut();
      $http.post('../server/main.php', {loginHandlerAction: "logout"}).success(function(data){
  //      console.log('register response', data);
        $location.path('/login');
      });
    };

});

