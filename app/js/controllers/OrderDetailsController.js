'use strict';

foodMeApp.controller('OrderDetailsController',
    function OrderDetailsController($scope, $http, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
  
$http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
 //       console.log('get user response', data);
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
        console.log("OrderDetail",$scope.username);
      });
  });