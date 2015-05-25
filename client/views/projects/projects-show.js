'use strict';

angular.module('wisely')
.controller('ProjectsShowCtrl', function($scope, Project, $state){
  Project.retrieve($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
  });
});
