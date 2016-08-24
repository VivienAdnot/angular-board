'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
  .factory('tickets', [ 'dataFetcher', function (dataFetcher) {
    
      var tickets = dataFetcher.fetchAll("tickets");

      return function() {
          return tickets;
      };

  }]);
