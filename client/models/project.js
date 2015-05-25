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

  Project.retrieve = function(projectId){
    return $http.get(nodeUrl + '/projects/' + projectId);
  };

  Project.remove = function(projectId){
    return $http.delete(nodeUrl + '/projects/' + projectId + '/delete');
  };

  Project.save = function(project){
    var o = angular.copy(project);
    delete o.__v;
    delete o.createdAt;
    delete o.createdBy;
    delete o._id;
    return $http.put(nodeUrl + '/projects/' + project._id + '/update', o);
  };

  return Project;
});
