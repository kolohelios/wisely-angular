'use strict';

angular.module('wisely')
.controller('ProjectsShowCtrl', function($scope, Project, $state, Collection){
  $scope.step = 'header';

  function determineCostImpact(){
    $scope.project.rooms.forEach(function(room){
      room.itemCollections.forEach(function(collection){
        console.log(collection);
        collection.items.forEach(function(item){
          if(collection.chosen === item._id){
            console.log(collection.numOfUnits * ($scope.config.rates.labor * item.laborHrsPerUnit + $scope.config.rates.multiplier * item.materialPerUnit));
          }
        });
      });
    });
  }

  Project.retrieve($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
    determineCostImpact();
  });

  $scope.selectRoom = function(room){
    $scope.selectedRoom = room;
  };

  $scope.selectCollection = function(collection){
    $scope.selectedCollection = collection;
  };

  $scope.getStarted = function(){
    $scope.step = 'collection';
  };
});
