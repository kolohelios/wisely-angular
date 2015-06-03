'use strict';

angular.module('wisely')
.controller('UserAdminCtrl', function($scope, User, $window){
  $scope.createOrEdit = false;
  $scope.role = 1;

  function mapRolesToString(users){
    function userMap(userToMap){
      switch(parseInt(userToMap.role, 10)){
        case 1:
          userToMap.role = 'Client';
          break;
        case 127:
          userToMap.role = 'Project Manager';
          break;
        case 255:
          userToMap.role = 'Admin';
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
    switch(user.role){
      case 'Client':
        user.role = 1;
        break;
      case 'Project Manager':
        user.role = 127;
        break;
      case 'Admin':
        user.role = 255;
    }
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
    var selectedUser = mapRoleToNumber(user);
    $scope.role = selectedUser.role;
    $scope.user = user;
  };

  $scope.save = function(user){
    if($scope.password1){
      if($scope.password1 === $scope.password2){
        user.password = $scope.password1;
      }
    }
    user.role = $scope.role;
    User.save(user)
    .then(function(response){
      var recordToUpdate = $window._.find($scope.users, function(userFromArray){
        return userFromArray._id === response.data._id;
      });
      recordToUpdate = mapRolesToString(recordToUpdate);
      recordToUpdate = response.data;
      $scope.role = 1;
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
      user.role = $scope.role;
      User.create(user)
      .then(function(response){
        var userObj = response.data;
        userObj = mapRolesToString(userObj);
        $scope.users.push(userObj);
        $scope.role = 1;
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
    $scope.role = 1;
    $scope.createOrEdit = false;
  };

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.sortColumn = column;
  };
});
