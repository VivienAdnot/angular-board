'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
// todo remove $scope from declarations, we don't have to do it'
  .controller('AboutCtrl', [ 'tickets', '$scope', function (tickets, $scope) {
    $scope.tickets = tickets();
  }]
);
