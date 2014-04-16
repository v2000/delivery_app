'use strict';

foodMeApp.controller('MapController',
    function MapController($scope, $http, UserService, $location, aService) {

    $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
    //       console.log('get user response', data);
    if(data === 'false'){
        $location.path('/login');
    }
    var data1 = data.replace(/"/g,'');
    $scope.username = data1;
    console.log("Map",$scope.username);
    });
//***************************************************************************
    $scope.map;

    var geocoder;
    var map;
$scope.initialize = function() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
}


$scope.codeAddress = function() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
    //***********************************************************************
   
  



  });
