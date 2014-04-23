'use strict';

foodMeApp.controller('OrderDetailsController',
    function OrderDetailsController($scope, $http, $routeParams, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
    $scope.saveInfo={};
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
          extraInfo:$scope.todayOrderData[i].extraInfo,
          done:$scope.todayOrderData[i].done,
          doneTime:$scope.todayOrderData[i].doneTime});
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
      console.log("$scope.orderData.done", $scope.orderData.done);

      $scope.saveInfo.done = $scope.orderData.done;



      if ($scope.orderData.done=="Done") {
        $('.delete').remove();
      }

      $('#infotext').append($scope.orderData.extraInfo);
      $("#textArea").val($scope.orderData.extraInfo);
      //$("#checkbox").val($scope.orderData.extraInfo);
     }); 

    $scope.cancel = function() {
      $('#textArea').val("");
    }

    $scope.save = function() {
       $('.delete').remove();
       $('#infotext').append($scope.orderData.extraInfo);
       console.log("APPPPPENDDDDDD",$scope.orderData.extraInfo);
      //var saveInfo=$('#textArea').val();
      //var carrentId=$routeParams.id;
      //console.log("saveInfo",saveInfo);
      console.log($scope.saveInfo);
      var carrentData=new Date();
      console.log(carrentData);
      $scope.saveInfo.done="Done";
       $http.post('../server/saveInfo.php', {info : $scope.saveInfo.extraInfo, done : $scope.saveInfo.done, data:carrentData, id : $routeParams.id}).success(function(data){
      });
     
       

    }
  });





