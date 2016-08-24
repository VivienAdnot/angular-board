'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ticket', {
        templateUrl: 'views/ticket.html',
        controller: 'TicketCtrl',
        controllerAs: 'ticket'
      })
      .when('/bykind', {
        templateUrl: 'views/byKind.html',
        controller: 'ByKindCtrl',
        controllerAs: 'bykind'
      })
      .when('/units', {
        templateUrl: 'views/units.html',
        controller: 'UnitCtrl',
        controllerAs: 'units'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
