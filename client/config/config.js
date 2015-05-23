/* eslint no-reserved-keys:0 */
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
  .state('userAdmin', {url: '/useradmin', templateUrl: '/views/users/admin.html', controller: 'UserAdminCtrl'})
  .state('projects', {url: '/projects', templateUrl: '/views/projects/projects.html', abstract: true})
  .state('projects.list', {url: '/', templateUrl: '/views/projects/projects-list.html', controller: 'ProjectsListCtrl'})
  .state('projects.show', {url: '/{projectId}', templateUrl: '/views/projects/projects-show.html', controller: 'ProjectsShowCtrl'})
  .state('projects.new', {url: '/new', templateUrl: '/views/projects/projects-new.html', controller: 'ProjectsNewCtrl'})
  .state('projects.edit', {url: '/{projectId}/edit', templateUrl: '/views/projects/projects-new.html', controller: 'ProjectsNewCtrl'});
});
