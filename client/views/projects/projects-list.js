'use strict';

angular.module('wisely')
.controller('ProjectsListCtrl', function(Project, $scope, $state){
  Project.index()
  .then(function(response){
    $scope.projects = response.data;
    $scope.projects = $scope.projects.map(function(project){
      project.address = project.address.split('\n');
      return project;
    });
  });

  $scope.showProject = function(project){
    $state.go('projects.show', {projectId: project});
  };
});
