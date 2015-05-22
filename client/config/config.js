'use strict';

angular.module('wisely')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('login', {url: '/login', templateUrl: '/views/users/login.html', controller: 'UserLoginCtrl'})
  .state('userAdmin', {url: '/useradmin', templateUrl: '/views/users/admin.html', controller: 'UserAdminCtrl'});
});
