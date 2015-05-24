'use strict';

angular.module('wisely')
.controller('CollectionsShowCtrl', function($scope, Collection, $state){
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

  $scope.edit = function(item){
    $scope.item = item;
    $scope.editItem = true;
    $scope.createOrEditItem = true;
  };
});
