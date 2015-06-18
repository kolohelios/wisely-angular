'use strict';

angular.module('wisely')
.controller('UserAdminCtrl', function($scope, User, $window, $rootScope){
  $scope.createOrEdit = false;
  $scope.user = {};
  $scope.user.role = 1;
  $scope.sortReverse = false;

  function mapRolesToString(users){
    function userMap(userToMap){
      for(var key in $rootScope.config.roles){
        if($rootScope.config.roles[key] === userToMap.role){
          userToMap.role = key;
        }
      }
      return userToMap;
    }
    if(Array.isArray(users)){
      users = users.map(userMap);
    }else{
      userMap(users);
    }
    return users;
  }

  function mapRoleToNumber(user){
    user.role = $rootScope.config.roles[user.role];
    return user;
  }

  function getUsers(){
    User.index()
    .then(function(response){
      $scope.users = response.data;
      $scope.users = mapRolesToString($scope.users);
    });
  }

  getUsers();

  $scope.edit = function(user){
    $scope.editUser = $scope.createOrEdit = true;
    console.log(user);
    $scope.user.role = mapRoleToNumber(user);
    $scope.user = user;
  };

  $scope.save = function(user){
    if($scope.password1){
      if($scope.password1 === $scope.password2){
        user.password = $scope.password1;
      }else{
        $window.swal({title: 'Password Error', text: 'The passwords must match.', type: 'error'});
      }
    }
    User.save(user)
    .then(function(response){
      var recordToUpdate = $window._.find($scope.users, function(userFromArray){
        return userFromArray._id === response.data._id;
      });
      recordToUpdate = mapRolesToString(recordToUpdate);
      recordToUpdate = response.data;
      $scope.user = {};
      $scope.editUser = $scope.createOrEdit = false;
    })
    .catch(function(){
      $window.swal({title: 'User Save Error', text: 'There was an error saving the user changes.', type: 'error'});
      $scope.user = {};
    });
  };

  $scope.remove = function(user){
    User.remove(user)
    .then(function(response){
      $window._.remove($scope.users, function(userFromArray){
        return userFromArray._id === response.data._id;
      });
    });
  };

  $scope.create = function(user){
    if($scope.password1 === $scope.password2){
      user.password = $scope.password1;
      User.create(user)
      .then(function(response){
        var userObj = response.data;
        userObj = mapRolesToString(userObj);
        $scope.users.push(userObj);
        $scope.user.role = 1;
        $scope.createOrEdit = false;
        $scope.user = {};
      })
      .catch(function(){
        $window.swal({title: 'User Creation Error', text: 'There was a problem creating a new user. Make sure an account doesn\'t already exist with this email address.', type: 'error'});
      });
    }else{
      $window.swal({title: 'Password Error', text: 'The passwords must match.', type: 'error'});
    }
  };

  $scope.createButton = function(){
    $scope.createOrEdit = true;
  };

  $scope.cancel = function(){
    $scope.user = {};
    $scope.user.role = 1;
    $scope.createOrEdit = false;
  };

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    console.log($scope.sortReverse);
    $scope.sortColumn = column;
  };
});
