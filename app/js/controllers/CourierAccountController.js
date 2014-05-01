'use strict';

foodMeApp.controller('CourierAccountController',
    function CourierAccountController($rootScope, $scope, $http, UserService, $location, aService) {
$scope.showFirmAddress = false;
        $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){

        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
        console.log("CourierAccount",$scope.username);
      });
        

      $http.get('../server/getTodayOrdersData.php').success(function(data){
      
      $scope.todayOrderData=data;
      console.log('get orders details', $scope.todayOrderData);

      for (var i = 0; i < $scope.todayOrderData.length; i++) {
        $scope.todayOrderData[i] = {
          ID:$scope.todayOrderData[i].ID, 
          orderNumber:$scope.todayOrderData[i].orderNumber, 
          productName:$scope.todayOrderData[i].productName, 
          quantity:$scope.todayOrderData[i].quantity,
          deliveryTime:$scope.todayOrderData[i].deliveryTime,
          deliveryAddress:$scope.todayOrderData[i].deliveryAddress, 
          done:$scope.todayOrderData[i].done,
          isChecked:false};
      };

      for (var i = 0; i < $scope.todayOrderData.length; i++) {
        console.log("QQQ",$scope.todayOrderData[i]);
      };
      });
     
   $scope.showStatus = function() {
    console.log("$scope.showStatus $scope.showStatus $scope.showStatus");

    $rootScope.addresses = [];
    angular.forEach($scope.todayOrderData, function(todo) {

      console.log("todo.isChecked todo.isChecked todo.isChecked",todo.isChecked);
      if (todo.isChecked===true) {
         $rootScope.addresses.push(todo);
         console.log("$rootScope.addresses",$rootScope.addresses);
       }
    });

    if ($scope.showFirmAddress){
      var firm = new Object();
      firm.deliveryAddress = "Amagerbrogade 221, 2300 København, Danmark";

       $rootScope.addresses.unshift(firm);
    }

    if ($rootScope.addresses.length===0) {
      alert("You must select at least 2 up to 9 addresses");
       location.reload(true);
    }

  }; 

$scope.showMap = function() {
    $scope.showStatus();
    console.log("showMap showMap showMap");

    $location.path("/show-map");
}
});

