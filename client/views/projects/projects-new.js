'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state){
  $scope.create = function(project){
    project.isRemodel = project.isRemodel || false;
    Project.create(project)
    .then(function(){
      $state.go('projects.list');
    })
    .catch(function(error){
      console.error('there was an error', error);
    });
  };
});
