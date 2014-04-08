'use strict';

foodMeApp.controller('CourierAccountController',
    function CourierAccountController($scope, $http, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
  
$http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
 //       console.log('get user response', data);
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
        console.log("CourierAccount",$scope.username);
      });


     
    /*$http.get('../server/getChars.php').success(function(data){
      console.log('getChars', data);

      // clean data so that haschar is a real true or false (not 1 or zero)
      for(var i = 0; i < data.length; i++){
        data[i].haschar = !! (data[i].haschar/1);
      }
      
      // put the data in the scope as characteristics
      $scope.characteristics = data;

      // react on changes to characteristics
      $scope.changed = function(id,haschar){
        var dataToServer = {id:id,haschar:haschar};
        $http.post('../server/profile.php', dataToServer);
      };
    });*/
  });

