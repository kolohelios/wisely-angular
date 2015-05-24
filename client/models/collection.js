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

  Collection.remove = function(collection){
    return $http.delete(nodeUrl + '/collections/' + collection._id + '/delete');
  };

  Collection.save = function(collection){
    var o = angular.copy(project);
    delete o.__v;
    delete o.createdAt;
    delete o._id;
    return $http.put(nodeUrl + '/collections/' + collection._id + '/update', o);
  };

  return Collection;
});
