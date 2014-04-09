'use strict';

foodMeApp.controller('OrderDetailsController',
    function OrderDetailsController($scope, $http, $routeParams, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
  
$http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
      });



//Send id to php and get data from order that have this id:
      var carrentId=$routeParams.id;
$.ajax({
      url: "server/getOrderData.php",
      type:"POST",
      processData: false,
      data: carrentId,
      dataType: "json",
      success:function(data){
         console.log('OrderDetailsController', data);
      }
    });
//********************************************************************
/*
      $http.get('../server/getTodayOrdersData.php').success(function(data){
      
      $scope.todayOrderData=data;
      console.log('get orders details', $scope.todayOrderData);

      for (var i = 0; i < $scope.todayOrderData.length; i++) {
        $scope.todayOrderData[i] = {ID:$scope.todayOrderData[i].ID, OrderNummer:$scope.todayOrderData[i].OrderNummer, 
          prodyctName:$scope.todayOrderData[i].prodyctName, quontity:$scope.todayOrderData[i].quontity,
          deliveryTime:$scope.todayOrderData[i].deliveryTime,
          deliveryAddress:$scope.todayOrderData[i].deliveryAddress, 
          optional:$scope.todayOrderData[i].optional, done:$scope.todayOrderData[i].done};
      };


      for (var i = 0; i < $scope.todayOrderData.length; i++) {
        console.log("QQQ",$scope.todayOrderData[i]);
      };




      $scope.details=$scope.todayOrderData[$routeParams.id]; 
      console.log("$routeParams.id",$routeParams.id);
      console.log("OrderDetailsController",$scope.details);

      });*/
     
//*****************************************************************
  });