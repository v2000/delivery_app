'use strict';

foodMeApp.controller('MapController',
    function MapController($scope, $http, $routeParams, UserService, $location, aService) {
//****************************************************************************
 $scope.map;
 $scope.orderData;
 $scope.deliveryAddress;
 var geocoder;

$scope.initialize = function() {
//#############################################################################
//First get adress from db:
    var orderNumber=$routeParams.id;

    console.log("$routeParams.id",$routeParams.id);

    $http.get('../server/getTodayOrdersData.php').success(function(data){
      
            $scope.todayOrderData=data;
            console.log('get orders details', $scope.todayOrderData);

            var todayOrderData=[];
            var index=0;

            for (var i = 0; i < $scope.todayOrderData.length; i++) {
              todayOrderData.push({ID:$scope.todayOrderData[i].ID, OrderNummer:$scope.todayOrderData[i].OrderNummer, 
                prodyctName:$scope.todayOrderData[i].prodyctName, quontity:$scope.todayOrderData[i].quontity,
                deliveryTime:$scope.todayOrderData[i].deliveryTime,
                deliveryAddress:$scope.todayOrderData[i].deliveryAddress, 
                optional:$scope.todayOrderData[i].optional, done:$scope.todayOrderData[i].done});
            };


            for (var i = 0; i < todayOrderData.length; i++) {
              console.log("QQQ",todayOrderData[i]);

              if (todayOrderData[i].OrderNummer===orderNumber){
                index=i;
              }

            };
            console.log("indexXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", index);
            $scope.orderData=todayOrderData[index];
            console.log("$scope.orderDataAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", $scope.orderData);
            //Adress is: $scope.orderData.deliveryAddress
            $scope.deliveryAddress=$scope.orderData.deliveryAddress;
            console.log("$scope.deliveryAddress-INSIDEEEEEEEEEEEEEEEEEEEEEEEEEEEE", $scope.deliveryAddress);
     
//#############################################################################
//console.log("$scope.deliveryAddress-OUTSIDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", $scope.deliveryAddress);
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//use geolocation that translate address to geo coordinates:
//$scope.codeAddress = function() {
  //var address = document.getElementById('address').value;
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': $scope.orderData.deliveryAddress}, function(results, status) {
    //$( "input:checkbox:checked" ).val();
    //$( "#address" ).val($scope.orderData.deliveryAddress);
    
    if (status == google.maps.GeocoderStatus.OK) {
       $scope.map.setCenter(results[0].geometry.location);

      var map=$scope.map;
      console.log("map",map);
      //var latlng = new google.maps.LatLng(-34.397, 150.644);

      var marker = new google.maps.Marker({
          map:  map,
          //position: latlng
          position: results[0].geometry.location
      });
      console.log("marker",marker);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  var latlng = new google.maps.LatLng(results[0].geometry.location);
//}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  console.log("initialize initialize initialize");
  //geocoder = new google.maps.Geocoder();
  //var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapContainer = document.getElementById('map-canvas');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '600px';
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
   $scope.map = new google.maps.Map(mapContainer, mapOptions);
  });  
}


google.maps.event.addDomListener(window, 'load', $scope.initialize());
//*************************************************************************
  
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





