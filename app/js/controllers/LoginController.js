'use strict';

foodMeApp.controller('LoginController',
    function LoginController($scope, $http, $location, UserService) {

    console.log('LoginController');


    $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
       //console.log('get user response', data);
       //if(data !== 'false'){
       //   data = 'false';
       // }
        console.log('get user response', data);
        if(data === 'false'){
          $location.path('/login');
        }
    });


    $scope.sendForm = function(){
      console.log('login user', $scope.user);
      $scope.user.loginHandlerAction = "login";

      $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
        if(data === 'false'){
          console.log('CCCCCCCCC! Your login failed');
          $scope.message = 'Your login failed';
          $location.path('/login');
          //window.location.reload();
        }
      });


      $http.post('../server/main.php', $scope.user).success(function(data){
         console.log('data.authenticated',data.authenticated);
         console.log('data.username',data.username);
         console.log('$scope.user.username',$scope.user.username);
        if(data.authenticated === true && data.username === $scope.user.username){
            UserService.setUsername(data.username);
            $location.path('/courier-account');
          }
        else{
          console.log('AAAAAAA! Your login failed');
            $scope.message = 'Your login failed';
            $location.path('/login');
            //window.location.reload();
          }
      });
    };

     $scope.deleteMessage = function(){
         $scope.message = '';
         $location.path('/login');
    };

});


