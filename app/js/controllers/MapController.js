'use strict';

foodMeApp.controller('MapController',
    function MapController($scope, $http, UserService, $location, aService) {
    $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8
};
  
$http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
 //       console.log('get user response', data);
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
        console.log("Map",$scope.username);
      });
  });