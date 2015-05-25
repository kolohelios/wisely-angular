'use strict';

angular.module('wisely')
.factory('Collection', function($rootScope, $http, nodeUrl){
  function Collection(){}

  Collection.create = function(collection){
    return $http.post(nodeUrl + '/collections', collection);
  };

  Collection.index = function(){
    return $http.get(nodeUrl + '/collections');
  };

  Collection.retrieve = function(collectionId){
    return $http.get(nodeUrl + '/collections/' + collectionId);
  };

  Collection.remove = function(collection){
    return $http.delete(nodeUrl + '/collections/' + collection._id + '/delete');
  };

  Collection.fetchByRoom = function(room){
    return $http.get(nodeUrl + '/collections?room=' + room.name);
  };

  Collection.save = function(collection){
    var o = angular.copy(collection);
    delete o.__v;
    delete o.createdAt;
    delete o._id;
    return $http.put(nodeUrl + '/collections/' + collection._id + '/update', o);
  };

  return Collection;
});
