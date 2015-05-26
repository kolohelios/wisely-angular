'use strict';

angular.module('wisely')
.controller('ProjectsShowCtrl', function($scope, Project, $state){
  $scope.step = 'header';
  $scope.captureImpacts = [];

  $scope.determineCostImpact = function(collection, itemId){
    // item is an optional argument to be used in the absence of collection.chosen
    var cost;
    var itemIdToCost = itemId ? itemId : collection.chosen;
    collection.items.forEach(function(itemToCheck){
      if(itemIdToCost === itemToCheck._id){
        cost = collection.numOfUnits * ($scope.config.rates.labor * itemToCheck.laborHrsPerUnit + $scope.config.rates.multiplier * itemToCheck.materialPerUnit);
      }
    });
    return cost;
  };

  Project.retrieve($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
    $scope.project.rooms.forEach(function(room){
      room.itemCollections.forEach(function(collection){
        console.log(collection);
        var obj = {};
        obj.room = room.name;
        obj.collection = collection.name;
        obj.cost = $scope.determineCostImpact(collection);
        $scope.captureImpacts.push(obj);
      });
    });
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
