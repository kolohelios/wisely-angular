'use strict';

angular.module('wisely')
.controller('CollectionsListCtrl', function(Collection, $scope, $state, $window){
  $scope.collection = {};
  $scope.collection.rooms = [];
  $scope.editCollection = false;
  $scope.createOrEditCollection = false;
  Collection.index()
  .then(function(response){
    $scope.collections = response.data;
  });

  $scope.createButton = function(){
    $scope.createOrEditCollection = true;
  };

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.sortColumn = column;
  };

  $scope.showCollection = function(collection){
    $state.go('collections.show', {collectionId: collection});
  };

  $scope.create = function(collection){
    Collection.create(collection)
    .then(function(response){
      $scope.collections.push(response.data);
      $scope.collecion = {};
      $scope.createOrEditCollection = false;
    });
  };

  $scope.save = function(collection){
    Collection.save(collection)
    .then(function(){
      var collectionToUpdate = $window._.find($scope.collections, function(collectionToSearch){
        return collection.$index === collectionToSearch.$index;
      });
      collection = collectionToUpdate;
      $scope.collection = {};
      $scope.editCollection = false;
      $scope.createOrEditCollection = false;
      $scope.collection.rooms = [];
    });
  };

  $scope.remove = function(collection){
    Collection.remove(collection)
    .then(function(response){
      $window._.remove($scope.collections, function(collectionFromArray){
        return collectionFromArray._id === response.data._id;
      });
    });
  };

  $scope.edit = function(collection){
    $scope.collection = collection;
    $scope.createOrEditCollection = true;
    $scope.editCollection = true;
  };

  $scope.addRoom = function(room){
    $scope.collection.rooms.push(room);
  };
});
