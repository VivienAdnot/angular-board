'use strict';

angular.module('inchApp')
  .controller('TicketsCtrl', [ 'tickets', '$scope', function (tickets, $scope) {
    
    tickets(function(data) {
      $scope.tickets = data;
    });
  }]
);
