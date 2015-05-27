/* eslint no-reserved-keys:0 */
'use strict';

angular.module('wisely')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html', controller: 'HomeCtrl'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('userAdmin', {url: '/useradmin', templateUrl: '/views/users/admin.html', controller: 'UserAdminCtrl'})
  .state('projects', {url: '/projects', templateUrl: '/views/projects/projects.html', abstract: true})
  .state('projects.list', {url: '/', templateUrl: '/views/projects/projects-list.html', controller: 'ProjectsListCtrl'})
  .state('projects.show', {url: '/{projectId}/show', templateUrl: '/views/projects/projects-show.html', controller: 'ProjectsShowCtrl'})
  .state('projects.new', {url: '/new', templateUrl: '/views/projects/projects-new.html', controller: 'ProjectsNewCtrl'})
  .state('projects.edit', {url: '/{projectId}/edit', templateUrl: '/views/projects/projects-new.html', controller: 'ProjectsNewCtrl'})
  .state('collections', {url: '/collections', templateUrl: '/views/collections/collections.html', abstract: true})
  .state('collections.list', {url: '/', templateUrl: '/views/collections/collections-list.html', controller: 'CollectionsListCtrl'})
  .state('collections.show', {url: '/{collectionId}', templateUrl: '/views/collections/collections-show.html', controller: 'CollectionsShowCtrl'});
});
