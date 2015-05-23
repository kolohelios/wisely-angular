'use strict';

angular.module('wisely')
.factory('Project', function($rootScope, $http, nodeUrl){
  function Project(){}

  Project.create = function(project){
    return $http.post(nodeUrl + '/projects', project);
  };

  Project.index = function(){
    return $http.get(nodeUrl + '/projects');
  };

  Project.remove = function(project){
    return $http.delete(nodeUrl + '/projects/' + project._id + '/delete');
  };

  Project.save = function(project){
    var o = angular.copy(project);
    delete o.__v;
    delete o.createdAt;
    delete o._id;
    return $http.put(nodeUrl + '/projects/' + project._id + '/update', o);
  };

  return Project;
});
