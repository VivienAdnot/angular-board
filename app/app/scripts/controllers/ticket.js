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
  .controller('TicketCtrl', [ 'tickets', '$scope', function (tickets, $scope) {
    tickets(function(data) {
      $scope.tickets = data;
    });    
  }]
);
