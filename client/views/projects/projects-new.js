'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state, Collection, User, $window){
  $scope.project = {};
  $scope.project.rooms = [];
  $scope.step = 'header';
  $scope.editMode = false;

  User.index()
  .then(function(response){
    $scope.users = response.data;
  });

  if($state.params.projectId){
    $scope.editMode = true;
    Project.retrieve($state.params.projectId)
    .then(function(response){
      $scope.project = response.data;
      var userToGetClientFrom = $window._.find($scope.users, function(user){
        return user._id === $scope.project.client;
      });
      $scope.project.client = userToGetClientFrom;
      var userToGetProjManFrom = $window._.find($scope.users, function(user){
        return user._id === $scope.project.projMan;
      });
      $scope.project.projMan = userToGetProjManFrom;
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

  $scope.addRoom = function(room){
    var obj = {};
    obj.name = room;
    $scope.project.rooms.push(obj);
  };

  function getCollections(room){
    Collection.fetchByRoom(room)
    .then(function(response){
      $scope.collections = response.data;
    });
  }

  $scope.setActiveRoom = function(room){
    $scope.activeRoom = room;
    getCollections(room);
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
