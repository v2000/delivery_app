'use strict';

foodMeApp.controller('MapController',
    function MapController($scope, $http, UserService, $location, aService) {

//****************************************************************************
 $scope.map;

var geocoder;

$scope.initialize = function() {
  console.log("initialize initialize initialize");
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapContainer = document.getElementById('map-canvas');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '600px';
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
   $scope.map = new google.maps.Map(mapContainer, mapOptions);
}




$scope.codeAddress = function() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    //$( "input:checkbox:checked" ).val();
    var aaa=$( "#address" ).val();
    console.log("address",aaa);
    
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





