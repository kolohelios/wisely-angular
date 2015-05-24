'use strict';

angular.module('wisely')
.controller('CollectionsShowCtrl', function($scope, Collection, $state){
  Collection.retrieve($state.params.collectionId)
  .then(function(response){
    $scope.collection = response.data;
  });
});
