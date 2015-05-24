'use strict';

angular.module('wisely')
.factory('Configuration', function($rootScope, $http, nodeUrl){
  function Configuration(){}

  Configuration.create = function(configuration){
    return $http.post(nodeUrl + '/configurations', configuration);
  };

  Configuration.index = function(){
    return $http.get(nodeUrl + '/configurations');
  };

  Configuration.retrieve = function(configurationId){
    return $http.get(nodeUrl + '/configurations/' + configurationId);
  };

  Configuration.remove = function(configuration){
    return $http.delete(nodeUrl + '/configurations/' + configuration._id + '/delete');
  };

  Configuration.save = function(configuration){
    var o = angular.copy(configuration);
    delete o.__v;
    delete o.createdAt;
    delete o._id;
    return $http.put(nodeUrl + '/configurations/' + configuration._id + '/update', o);
  };

  return Configuration;
});
