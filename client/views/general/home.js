'use strict';

angular.module('wisely')
.controller('HomeCtrl', function($scope, $rootScope, $state, $window, User, $http, Project){
  $scope.login = function(user){
    User.login(user)
    .then(function(response){
      $window.localStorage.wiselyJWTToken = response.data.token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
      $rootScope.activeUser = response.data.user;
      Project.index()
      .then(function(projects){
        if(projects.data.length === 1 && $rootScope.activeUser.role === 1){
          $state.go('projects.show', {projectId: projects.data[0]._id});
        }else{
          $state.go('projects.list');
        }
      });
      $state.go('home');
    })
    .catch(function(){
      $window.swal({title: 'Login Error', text: 'There was a problem with your login. Please try again.', type: 'error'});
    });
  };
});
