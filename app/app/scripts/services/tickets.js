'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
  .factory('tickets', function () {
    
      var tickets = [ 1, 2, 3];

      return function() {
          return tickets;
      };

  });
