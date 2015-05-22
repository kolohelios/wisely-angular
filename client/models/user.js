'use strict';

angular.module('wisely')
.factory('User', function($rootScope, $http, nodeUrl){
  function User(){}

  User.create = function(user){
    return $http.post(nodeUrl + '/users', user);
  };

  User.login = function(user){
    return $http.post(nodeUrl + '/users/authenticate', user);
  };

  User.index = function(){
    return $http.get(nodeUrl + '/users');
  };

  User.remove = function(user){
    return $http.delete(nodeUrl + '/users/' + user._id + '/delete');
  };

  User.save = function(user){
    var o = user;
    delete o.__v;
    delete o.createdAt;
    delete o._id;
    return $http.put(nodeUrl + '/users/' + user._id + '/update', o);
  };

  return User;
});
