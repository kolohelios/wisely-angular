'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state, Collection){
  $scope.rooms = [];
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
  function getCollections(){
    Collection.index()
    .then(function(response){
      $scope.collections = response.data;
    });
  }
  getCollections();

  $scope.addRoom = function(room){
    $scope.rooms.push(room);
  };
});
