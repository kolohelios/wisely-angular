'use strict';

angular.module('wisely')
.controller('CollectionsListCtrl', function(Collection, $scope, $state){
  Collection.index()
  .then(function(response){
    $scope.collections = response.data;
  });

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.sortColumn = column;
  };

  $scope.showCollection = function(collection){
    $state.go('collections.show', {collectionId: collection});
  };
});
