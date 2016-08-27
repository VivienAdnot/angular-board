'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('tickets', ['query', 'aggregate', function(query, aggregate) {
        var result = {};

        var aggregateNode = function(jsonObj) { //todo rename select node
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    aggregate.sum(result, key, jsonObj[key]);
                }
            }
        };

        var queryAndAggregate = function(callback) {
            var queryCallback = function(error, data, last) {
                if(error) {
                    callback(error);
                    return;
                }

                aggregateNode(data);
                if(last == true) {
                    callback(result);
                }
            };

            query("tickets", queryCallback);
        };

        return function(callback) {
            return queryAndAggregate(callback);
        };        

    }]);