'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

  foodMeApp.service('UserService', function($http){

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