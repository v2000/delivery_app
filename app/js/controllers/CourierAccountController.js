'use strict';

foodMeApp.controller('CourierAccountController',
    function CourierAccountController($scope, $http, UserService, $location, aService) {
    //$('.menu1').show();
    //$("html").removeAttr("id");
  
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

      /*
ID: "1"
OrderNummer: "0"
deliveryAddress: "Main str, 234, 2345 Village"
deliveryTime: "10.00-11.00"
optional: "0"
prodyctName: "Colorfull set"
quontity: "3"
      */
      //for(var i = 0; i < data.length; i++){
      //  $scope.todayOrderData.push({orderNumber:data.orderNumber, productName:data.productName});
      //}
      });
     
    /* 
      // put the data in the scope as characteristics
      $scope.characteristics = data;

      // react on changes to characteristics
      $scope.changed = function(id,haschar){
        var dataToServer = {id:id,haschar:haschar};
        $http.post('../server/profile.php', dataToServer);
      };
    });*/


    $scope.showDetails = function() {

    };

    $scope.showMap = function() {

    }
  });

