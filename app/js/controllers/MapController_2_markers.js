'use strict';

foodMeApp.controller('MapController', 
    function MapController($scope, $http, $routeParams, UserService, $location, aService) {
$scope.username;

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
            $scope.orderData=todayOrderData[index];
            //Adress is: $scope.orderData.deliveryAddress
            $scope.deliveryAddress=$scope.orderData.deliveryAddress;
 

$scope.map;
var geocoder;


$scope.initialize = function() {

  geocoder = new google.maps.Geocoder();


          //geocoder.geocode( { 'address': $scope.deliveryAddress}, function(results, status) {
            console.log("$scope.DELIVERYADRESS",$scope.deliveryAddress);
            geocoder.geocode( { 'address': $scope.deliveryAddress}, function(results, status) {
              
              if (status == google.maps.GeocoderStatus.OK) {
                 console.log("results[0].geometry.location",results[0].geometry.location);
                 

               
                            var latlng = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.A);
                            var mapContainer = document.getElementById('map-canvas');
                              mapContainer.style.width = '100%';
                              mapContainer.style.height = '400px';
                            var mapOptions = {
                              zoom: 8,
                              center: latlng,
                              mapTypeId: google.maps.MapTypeId.ROADMAP
                            }
                             $scope.map = new google.maps.Map(mapContainer, mapOptions);
                             $scope.map.setCenter(results[0].geometry.location);

                             var map=$scope.map;
                console.log("map",map);
                
                //place marker to delivery address:
                 var marker = new google.maps.Marker({
                    map:  map,
                    //position: latlng
                    position: results[0].geometry.location
                });
                console.log("marker",marker);
                //place marker there is your firm (Lilla Varvsgatan 14 Malmö):
                var latlng = new google.maps.LatLng(55.6139,12.9764);
                var firmmarker = new google.maps.Marker({
                    map:  map,
                    position: latlng
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
  
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