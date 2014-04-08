'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

  foodMeApp.service('UserService', function(){

    var user = {
      username: null,
      firstname: null,
      lastname: null
    };

    return {
      getUsername: function(){
        console.log('userService get', user.username);
        return user.username;
      },
      setUsername: function(n){
        user.username = n;
        console.log('userService set', n, user.username);
      },

      call: function(prop,val){
        if(val){
          user[prop] = val;
        }
        return user[prop];
      },
      logOut: function() {
        user.username = null;
      }
    }

  });






//***********************************************************
/*
  .service('UserService', function($http){

    var user = {
      username: null,
      firstname: null,
      lastname: null
    };

    return {
      getUsername: function(){
        return $http({
          url: '../server/main.php',
          method: "POST",
          async: false,
          data: {loginHandlerAction: "getuser"}
        });
      },
      setUsername: function(n){
          // Denna funktion bör fasas ut.
          user.username = n;
      },
      call: function(prop,val){
        if(val){
          user[prop] = val;
        }
        return user[prop];
      },
      logOut: function() {
        user.username = null;
      }
    }
  })

  .service('SearchFriendsService', function($q,$http){

    return {
      findIntrestName: function(){ 
        var defer = $q.defer();
        $http.get('../server/searchfriends2.php', { cache: 'true'}).success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      },
      findPersonsCharacteristics: function(){ 
        var defer = $q.defer();
        $http.get('../server/searchfriends4.php', { cache: 'true'}).success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      },
      findPersons: function(){  
        var defer = $q.defer();
        $http.get('../server/searchfriends3.php', { cache: 'true'}).success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      },
    };
  })

    .service('FriendService', function(){

    var friends = [];

    return {
      add: function(item){
        friends.push(item);
        //console.log(friends);
      },
      getItems: function(){
        return friends;
      },
      getTotal: function(){
        var total = 0;
        for(var i=0; i < friends.length; i++){
          total ++;
        }
        return total;
      }
    };
  });*/