'use strict';

foodMeApp.controller('MapController',
    function MapController($scope, $http, UserService, $location, aService) {
    //***************************************************************************
    var geocoder;
    var map;
$scope.initialize = function() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
   

    $scope.cities = [];
    $scope.map;
    $scope.infoBox = new google.maps.InfoWindow();
    var mapContainer = document.getElementById('map');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '500px';

    $http.get('../db/data.json').success(function(data) {
        $scope.cities = data;
        console.log("$scope.cities",$scope.cities)
    });

  /*  $scope.initialize = function() {
        var mapOptions = {
            center: new google.maps.LatLng(50.5, 30.5),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(mapContainer, mapOptions);
    }*/

    $scope.showCity = function(city) {
        var coords = new google.maps.LatLng(city.lat, city.lng);
        $scope.infoBox.setContent(city.city + ' - ' + city.desc);
        $scope.infoBox.setPosition(coords);
        $scope.infoBox.open($scope.map);
        $scope.map.setCenter(coords);
    }
  
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




