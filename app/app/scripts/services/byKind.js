'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('byKind', ['query', function(query) {

        var result = {};

        var aggregateNode = function(jsonObj) {
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {

                    var oldSum = result[key] || 0;
                    result[key] = oldSum + jsonObj[key];
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

            query("units_by_kind", queryCallback);
        };

        return function(callback) {
            return queryAndAggregate(callback);
        };

    }]);