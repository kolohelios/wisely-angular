'use strict';

angular.module('wisely')
.controller('ProjectsShowCtrl', function($scope, Project, $state){
  $scope.step = 'header';
  $scope.captureImpacts = [];

  $scope.determineCostImpact = function(collection, itemId){
    // item is an optional argument to be used in the absence of collection.chosen
    var cost;
    var itemIdToCost = itemId ? itemId : collection.choice;
    collection.items.forEach(function(itemToCheck){
      if(itemIdToCost === itemToCheck._id){
        cost = collection.numOfUnits * ($scope.config.rates.labor * itemToCheck.laborHrsPerUnit + $scope.config.rates.multiplier * itemToCheck.materialPerUnit);
        console.log(cost);
      }
    });
    return cost;
  };

  function addCostImpactObject(room, collection){
    var obj = {};
    obj.room = room.name;
    obj.collection = collection.name;
    obj.cost = $scope.determineCostImpact(collection);
    if(obj.cost){
      $scope.captureImpacts.push(obj);
    }
  }

  Project.retrieve($state.params.projectId)
  .then(function(response){
    $scope.project = response.data;
    $scope.project.rooms.forEach(function(room){
      room.itemCollections.forEach(function(collection){
        addCostImpactObject(room, collection);
      });
      $scope.impactTotal = $scope.captureImpacts.reduce(function(acc, curr){
        return acc + curr.cost;
      }, 0);
    });
  });

  $scope.selectRoom = function(room){
    $scope.selectedRoom = room;
    $scope.selectedCollection = [];
  };

  $scope.selectCollection = function(collection){
    $scope.selectedCollection = collection;
    $scope.step = 'collection';
  };

  $scope.getStarted = function(){
    $scope.step = 'selection';
  };

  $scope.selectItem = function(item){
    if($scope.selectedItem === item){
      $scope.selectedItem = null;
    }else{
      $scope.selectedItem = item;
    }
  };

  $scope.saveSelection = function(){
    delete $scope.project.client;
    delete $scope.project.projMan;
    $scope.selectedCollection.choice = $scope.selectedItem._id;
    addCostImpactObject($scope.selectedRoom, $scope.selectedCollection);
    Project.save($scope.project)
    .then(function(results){
      $scope.impactTotal = $scope.captureImpacts.reduce(function(acc, curr){
        return acc + curr.cost;
      }, 0);
      $scope.step = 'selection';
    });
  };
});
