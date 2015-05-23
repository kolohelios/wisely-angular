'use strict';

angular.module('wisely')
.controller('NavCtrl', function($rootScope, $scope, $state, $http, User, $window){
  function parseJWT(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }

  if($window.localStorage.wiselyJWTToken){
    var tokenData = parseJWT($window.localStorage.wiselyJWTToken);
    if(Date.now() > tokenData.exp){
      $http.defaults.headers.common.Authorization = 'Bearer ' + $window.localStorage.wiselyJWTToken;
      $rootScope.activeUser = {
        _id: tokenData.sub,
        role: tokenData.rol
      };
    }else{
      $window.localStorage.removeItem('wiselyJWTToken');
      $rootScope.activeUser = null;
      $http.defaults.headers.common.Authorization = null;
    }
  }

  $scope.logout = function(){
    $rootScope.activeUser = null;
    $http.defaults.headers.common.Authorization = null;
    $window.localStorage.removeItem('wiselyJWTToken');
    $state.go('home');
  };
});
