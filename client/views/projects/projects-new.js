'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state, Collection, User, $window){
  $scope.project = {};
  $scope.project.rooms = [];
  $scope.step = 'header';
  $scope.editMode = false;

  function getEditRecord(){
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
  }

  User.index()
  .then(function(response){
    $scope.users = response.data;
    getEditRecord();
  });

  $scope.create = function(project){
    project.isRemodel = project.isRemodel || false;
    Project.create(project)
    .then(function(response){
      $scope.project = response.data;
      $scope.step = 'collections';
      $scope.editMode = true;
      var userToGetClientFrom = $window._.find($scope.users, function(user){
        return user._id === $scope.project.client;
      });
      $scope.project.client = userToGetClientFrom;
      var userToGetProjManFrom = $window._.find($scope.users, function(user){
        return user._id === $scope.project.projMan;
      });
      $scope.project.projMan = userToGetProjManFrom;
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
    Project.save(project)
    .then(function(){
      $scope.step = 'collections';
    });
  };

  $scope.editHeader = function(){
    $scope.step = 'header';
  };

  $scope.setActiveCollection = function(collection){
    $scope.collection = collection;
  };

  $scope.removeCollection = function(collectionIndex){
    $scope.activeRoom.itemCollections.splice(collectionIndex, 1);
    $scope.save($scope.project);
  };

  $scope.saveCollectionChoices = function(items){
    var itemIds = items.map(function(itemToMap){
      return itemToMap._id;
    });
    var newCollection = {
      name: $scope.collection.name,
      costDriver: $scope.collection.costDriver,
      numOfUnits: $scope.numOfUnits,
      items: itemIds
    };
    $scope.activeRoom.itemCollections = $scope.activeRoom.itemCollections ? $scope.activeRoom.itemCollections : [];
    $scope.activeRoom.itemCollections.push(newCollection);
    $scope.save($scope.project);
  };
});
