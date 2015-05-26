/* eslint no-unused-vars: 0 */

'use strict';

angular.module('wisely')
.controller('CollectionsShowCtrl', function($scope, Collection, $state, $window){
  $scope.editItem = false;
  $scope.createOrEditItem = false;

  Collection.retrieve($state.params.collectionId)
  .then(function(response){
    $scope.collection = response.data;
  });

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.sortColumn = column;
  };

  $scope.createButton = function(){
    $scope.createOrEditItem = true;
  };

  $scope.create = function(item){
    $scope.collection.items.push(item);
    Collection.save($scope.collection)
    .then(function(){
    });
  };

  $scope.save = function(item){
    var itemToUpdate = $window._.find($scope.collection, function(itemToSearch){
      return item.$index === itemToSearch.$index;
    });
    itemToUpdate = item;
    Collection.save($scope.collection)
    .then(function(response){
      $scope.collection = response.data;
      $scope.itemForm = {};
      $scope.editItem = false;
      $scope.createOrEditItem = false;
    });
  };

  $scope.remove = function(item){
    $window._.remove($scope.collection.items, function(itemFromArray){
      return itemFromArray._id === item._id;
    });
    Collection.save($scope.collection)
    .then(function(){

    });
  };

  $scope.cancel = function(){
    $scope.itemForm = {};
    $scope.itemForm.photo = '';
    $scope.createOrEditItem = false;
  };

  $scope.edit = function(item){
    $scope.itemForm = item;
    $scope.editItem = true;
    $scope.createOrEditItem = true;
  };

  $scope.editCollection = function(collectionId){
    $state.go()
  }
});
