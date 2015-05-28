'use strict';

angular.module('wisely')
.controller('ProjectsNewCtrl', function($scope, Project, $state, Collection, User, $window, Message){
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
    $scope.save($scope.project);
  };

  $scope.removeRoom = function(room){
    $window._.remove($scope.project.rooms, function(roomToCheck){
      return roomToCheck._id === room._id;
    });
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
      $scope.step = 'collections';
    });
  };

  $scope.editHeader = function(){
    $scope.step = 'header';
  };

  $scope.setActiveCollection = function(collection){
    $scope.collection = collection;
  };

  $scope.editCollection = function(collection){
    $scope.collection = collection;
  };

  $scope.removeCollection = function(collectionIndex){
    $scope.activeRoom.itemCollections.splice(collectionIndex, 1);
    $scope.save($scope.project);
  };

  $scope.saveCollectionChoices = function(items){
    console.log($scope.collection.numOfUnits);
    if($scope.collection.numOfUnits > 0){
      var itemsToInclude = items.filter(function(itemToMap){
        return itemToMap._id;
      });
      var newCollection = {
        name: $scope.collection.name,
        costDriver: $scope.collection.costDriver,
        numOfUnits: $scope.numOfUnits,
        items: itemsToInclude
      };
      $scope.activeRoom.itemCollections = $scope.activeRoom.itemCollections ? $scope.activeRoom.itemCollections : [];
      $scope.activeRoom.itemCollections.push(newCollection);
      $scope.save($scope.project);
    }else{
      $window.swal({title: 'Collection Creation Error', text: 'You must choose a number of units.', type: 'error'});
    }
  };

  $scope.releaseToClient = function(){
    var number = $scope.project.client.phone;
    console.log(number);
    var tel = number.split('').filter(function(n){
      return !isNaN(n);
    });
    tel = tel.join('');
    Message.sendText({number: tel, message: 'hello from Wisely!'});
  };
});
