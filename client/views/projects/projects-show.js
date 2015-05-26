'use strict';

angular.module('wisely')
.controller('ProjectsShowCtrl', function($scope, Project, $state){
  $scope.step = 'header';
  Project.retrieve($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
  });

  $scope.selectRoom = function(room){
    $scope.selectedRoom = room;
  };

  $scope.selectCollection = function(collection){
    $scope.selectedCollection = collection;
  };

  $scope.getStarted = function(){
    $scope.step = 'collection';
  };
});
