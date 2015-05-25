'use strict';

angular.module('wisely')
.controller('ProjectsListCtrl', function(Project, $scope, $state, $window){
  Project.index()
  .then(function(response){
    $scope.projects = response.data;
    $scope.projects = $scope.projects.map(function(project){
      project.address = project.address.split('\n');
      return project;
    });
  });

  $scope.edit = function(projectId){
    $state.go('projects.edit', {projectId: projectId});
  };

  $scope.remove = function(projectId){
    Project.remove(projectId)
    .then(function(response){
      $window._.remove($scope.projects, function(projectFromArray){
        return projectFromArray._id === response.data._id;
      });
    });
  };

  $scope.showProject = function(projectId){
    $state.go('projects.show', {projectId: projectId});
  };
});
