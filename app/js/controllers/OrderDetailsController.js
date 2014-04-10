'use strict';

foodMeApp.controller('OrderDetailsController',
    function OrderDetailsController($scope, $http, $routeParams, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
    console.log('OrderDetailsController');
  
    $http.post('../server/main.php', {loginHandlerAction: "getuser"}).success(function(data){
        if(data === 'false'){
          $location.path('/login');
        }
        var data1 = data.replace(/"/g,'');
        $scope.username = data1;
      });


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
      console.log("index", index);
      $scope.orderData=todayOrderData[index];
      console.log("$scope.orderData", $scope.orderData);
     }); 
  });