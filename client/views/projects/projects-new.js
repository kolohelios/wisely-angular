'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state, Collection, User){
  $scope.project = {};
  $scope.project.rooms = [];
  $scope.step = 'header';
  $scope.editMode = false;

  User.index()
  .then(function(response){
    $scope.users = response.data;
  });

  if($state.params.projectId){
    console.log($state.params.projectId);
    $scope.editMode = true;
    Project.retrieve($state.params.projectId)
    .then(function(response){
      $scope.project = response.data;
    });
  }
  $scope.create = function(project){
    project.isRemodel = project.isRemodel || false;
    Project.create(project)
    .then(function(){
      $scope.step = 'collections';
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
    var obj = {};
    obj.name = room;
    $scope.project.rooms.push(obj);
  };

  $scope.setActiveRoom = function(room){
    $scope.activeRoom = room;
  };

  $scope.save = function(project){
    console.log(project);
    Project.save(project)
    .then(function(response){
      console.log(response);
      $scope.step = 'collections';
    });
  };

  $scope.setActiveCollection = function(collection){
    $scope.collection = collection;
  };
});
