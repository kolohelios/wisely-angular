'use strict';

angular.module('wisely')
.controller('UserAdminCtrl', function($scope, User, $window){
  $scope.createOrEdit = false;
  function getUsers(){
    User.index()
    .then(function(response){
      $scope.users = response.data;
      $scope.users = $scope.users.map(function(user){
        switch(user.role){
          case 1:
            user.role = 'Client';
            break;
          case 255:
            user.role = 'Admin';
        }
        return user;
      });
    });
  }
  getUsers();

  $scope.edit = function(user){
    $scope.editUser = $scope.createOrEdit = true;
    $scope.user = user;
  };

  $scope.save = function(user){
    User.save(user)
    .then(function(response){
      var recordToUpdate = $window._.find($scope.users, function(userFromArray){
        return userFromArray._id === response.data._id;
      });
      recordToUpdate = response.data;
      console.log(recordToUpdate);
      $scope.user = {};
      $scope.editUser = $scope.createOrEdit = false;
    })
    .catch(function(response){
      console.log(response);
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
        $scope.users.push(response.data);
        $scope.createOrEdit = false;
        $scope.user = {};
      })
      .catch(function(response){
        console.error(response);
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
    $scope.createOrEdit = false;
  };

  $scope.sort = function(column){
    if($scope.sortColumn === column){
      $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.sortColumn = column;
  };
});
