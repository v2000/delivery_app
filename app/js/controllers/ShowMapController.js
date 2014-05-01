'use strict';

foodMeApp.controller('ShowMapController', 
    function ShowMapController($rootScope, $scope, $http, $routeParams, UserService, $location, aService) {

$scope.username;
$scope.map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;



console.log("ShowMapController $rootScope.addresses[0].deliveryAddress",$rootScope.addresses[0].deliveryAddress);
console.log("AAAAAAAShowMapController $rootScope.addresses",$rootScope.addresses);

for (var i = 0; i < $rootScope.addresses.length; i++) {
$scope.addresses[i]=$rootScope.addresses[i];
}
console.log("$scope.addresses",$scope.addresses);


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

            var todayOrderData=["Vintergatan 21 21120 Malmö"];
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
}

$scope.calcRoute = function() {
  if (typeof $scope.startAddress === 'undefined' || typeof $scope.endAddress === 'undefined') {
  alert("Pleace, choose start and end address")
} else {
  console.log("calcRoute calcRoute calcRoute calcRoute calcRoute calcRoute calcRoute");

      var start = $scope.startAddress.deliveryAddress;
      var end = $scope.endAddress.deliveryAddress;
      var waypts = [];
      
      var wpAdrdresses=[];
      for (var i = 0; i < ($rootScope.addresses).length; i++) {
        if ($rootScope.addresses[i].deliveryAddress===start ){
        console.log("start", $rootScope.addresses[i].deliveryAddress);
        }else 
          if ($rootScope.addresses[i].deliveryAddress===end ){
            console.log("end",$rootScope.addresses[i].deliveryAddress);
          }else{
              wpAdrdresses.push($rootScope.addresses[i].deliveryAddress);
                 }
              console.log("wpAdrdresses",wpAdrdresses);
              }


      for (var i = 0; i < wpAdrdresses.length; i++) {
      waypts.push({
              location:wpAdrdresses[i],
              stopover:true});
        }
      console.log("waypts", waypts);

      var request = {
          origin:start,
          destination:end,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
      };
      console.log("request", request);
      directionsService.route(request, function(response, status) {
        console.log("status", status);
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
         console.log("response", response);

         var route = response.routes[0];
          var summaryPanel = document.getElementById('directions_panel');
          summaryPanel.innerHTML = '';
          // For each route, display summary information.
          for (var i = 0; i < route.legs.length; i++) {
            console.log("route.legs[i].start_address",route.legs[i].start_address);
            console.log("route.legs[i].end_address",route.legs[i].end_address);
            console.log("route.legs[i].distance.text",route.legs[i].distance.text);

            var routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          }
      }
    });
  }
}

$scope.computeTotalDistance = function(result) {
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
    }); //$http.get('../server/getTodayOrdersData.php'
  });//  $http.post('../server/main.php'
});