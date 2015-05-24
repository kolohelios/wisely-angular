'use strict';

angular.module('wisely')
.controller('CollectionsShowCtrl', function($scope, Collection, $state){
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
});
