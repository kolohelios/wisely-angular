'use strict';

angular.module('wisely')
.factory('Message', function($rootScope, $http, nodeUrl){
  function Message(){}

  // number: string, message: string
  Message.sendText = function(textData){
    return $http.post(nodeUrl + '/messages/text', textData);
  };
  // email: string, name: string, subject: string, text: string
  Message.sendEmail = function(emailData){
    return $http.post(nodeUrl + '/messages/email', emailData);
  };

  return Message;
});
