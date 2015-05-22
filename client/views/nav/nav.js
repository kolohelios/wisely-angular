'use strict';

angular.module('wisely')
.controller('NavCtrl', function($rootScope, $scope, $state, $http, User){
  $scope.logout = function(){
    $rootScope.activeUser = null;
    $http.defaults.headers.common.Authorization = null;
    $state.go('home');
  };
});
