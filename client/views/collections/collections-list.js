'use strict';

angular.module('wisely')
.controller('CollectionsListCtrl', function(Collection, $scope, $state, $window){
  $scope.collection = {};
  $scope.collection.rooms = [];
  $scope.createOrEditItem = false;
  Collection.index()
  .then(function(response){
    $scope.collections = response.data;
  });

  $scope.createButton = function(){
    $scope.createOrEditItem = true;
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
      $scope.createOrEditItem = false;
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
  }

  $scope.addRoom = function(room){
    $scope.collection.rooms.push(room);
  };
});
