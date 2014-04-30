'use strict';

foodMeApp.controller('CourierAccountController',
    function CourierAccountController($rootScope, $scope, $http, UserService, $location, aService) {
  
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

    if ($rootScope.addresses.length===0) {
      alert("You must select at least 2 up to 9 addresses");
       location.reload(true);
    }
    
  /*$scope.showStatus = function() {
    console.log("$scope.showStatus $scope.showStatus $scope.showStatus");

    var selected = [];
     console.log("$rootScope.todayOrders",$rootScope.todayOrders);
     console.log("$rootScope.todayOrders",$rootScope.todayOrders);

    var oldTodos=$rootScope.addresses;
    $scope.todos=[];

    angular.forEach($rootScope.todayOrders, function(todo) {
      console.log("todo.isChecked todo.isChecked todo.isChecked",todo.isChecked);
      if (todo.isChecked===true) {

         $scope.todos.push(todo);
         console.log("$scope.todos",$scope.todos);
       }
    console.log("$scope.todos",$scope.todos);
    });*/

    /*angular.forEach($rootScope.todayOrders, function(s) { 
      if ($rootScope.todayOrders.isChecked=== true) {
        $rootScope.addresses.push($rootScope.todayOrders.address);
        console.log("$rootScope.todayOrders",$rootScope.todayOrders);
      }
    });*/
    //return selected.length ? selected.join(', ') : 'Not set';
  }; 
/*
 $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
*/
$scope.showMap = function() {
    $scope.showStatus();
    console.log("showMap showMap showMap");

    $location.path("/show-map");

 /*$routeProvider. when($location('/showMap'), {
        controller: 'ShowMapController',
        templateUrl: 'views/showMap.html'
      });*/

}






  });

