'use strict';

angular.module('wisely')
.controller('ProjectsListCtrl', function(Project, $scope, $state){
  Project.index()
  .then(function(response){
    $scope.projects = response.data;
  });
});
