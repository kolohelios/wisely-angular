'use strict';

angular.module('wisely')
.factory('User', function($rootScope, $http, nodeUrl){
  function User(){}

  User.login = function(user){
    $http.post(nodeUrl + '/users/authenticate', user);
  };


  return User;
});
