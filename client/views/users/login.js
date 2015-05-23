'use strict';

angular.module('wisely')
.controller('UserLoginCtrl', function($scope, $rootScope, $state, $window, User, $http){
  $scope.login = function(user){
    User.login(user)
    .then(function(response){
      $window.localStorage.wiselyJWTToken = response.data.token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
      $rootScope.activeUser = response.data.user;
      $state.go('home');
    })
    .catch(function(){
      $window.swal({title: 'Login Error', text: 'There was a problem with your login. Please try again.', type: 'error'});
    });
  };
});
