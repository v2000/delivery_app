'use strict';

foodMeApp.controller('MapController', 
    function MapController($scope, $http, $routeParams, UserService, $location, aService) {
$scope.username;
$scope.map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

$http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){

        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
        console.log("$scope.username INSIDE !!!!!!!!!!!!!!",$scope.username);
      
//First get adress from db:
    var orderNumber=$routeParams.id;

    console.log("$routeParams.id",$routeParams.id);

    $http.get('../server/getTodayOrdersData.php').success(function(data){
      
            $scope.todayOrderData=data;
            console.log('get orders details', $scope.todayOrderData);

            var todayOrderData=[];
            var index=0;

            for (var i = 0; i < $scope.todayOrderData.length; i++) {
              todayOrderData.push({ID:$scope.todayOrderData[i].ID, orderNumber:$scope.todayOrderData[i].orderNumber, 
                productName:$scope.todayOrderData[i].productName, quantity:$scope.todayOrderData[i].quantity,
                deliveryTime:$scope.todayOrderData[i].deliveryTime,
                deliveryAddress:$scope.todayOrderData[i].deliveryAddress, 
                done:$scope.todayOrderData[i].done});
            };


            for (var i = 0; i < todayOrderData.length; i++) {
              console.log("QQQ",todayOrderData[i]);

              if (todayOrderData[i].orderNumber===orderNumber){
                index=i;
              }

            };
            $scope.orderData=todayOrderData[index];
            //Adress is: $scope.orderData.deliveryAddress
            $scope.deliveryAddress=$scope.orderData.deliveryAddress;
 





$scope.initialize = function() {
 directionsDisplay = new google.maps.DirectionsRenderer();
  var coord = new google.maps.LatLng(55.648394, 12.613668999999959);
  var mapContainer = document.getElementById('map-canvas');
                              mapContainer.style.width = '100%';
                              mapContainer.style.height = '400px';
  var mapOptions = {
    zoom:7,
    center: coord,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  $scope.map = new google.maps.Map(mapContainer, mapOptions);
  
  directionsDisplay.setMap($scope.map);

  var request = {
      origin:"Amagerbrogade 221, 2300 København, Danmark",
      destination:$scope.deliveryAddress,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      computeTotalDistance(directionsDisplay.directions);
    }
  });
}


 function computeTotalDistance(result) {

    var total = 0;
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000.
    console.log("total",total);
    document.getElementById("total").innerHTML = total + " km";
  }   

google.maps.event.addDomListener(window, 'load', $scope.initialize());
//*************************************************************************
    }); //$http.get('../server/getTodayOrdersData.php'
  });//  $http.post('../server/main.php'
});





/*
      console.log("results[0].geometry.location",results[0].geometry.location);
      console.log("results[0].geometry.location.A",results[0].geometry.location.A);
      console.log("results[0].geometry.location.k",results[0].geometry.location.k);

*/


/*
Через глобальную область видимости $rootScope:

app.controller('oneCtrl', ['$scope','$rootScope', function($scope, $rootScope) {
   $rootScope.var=1;
}]);

app.controller('twoCtrl', ['$scope','$rootScope', function($scope, $rootScope) {
   console.log($rootScope.var);     //1
}]);
*/