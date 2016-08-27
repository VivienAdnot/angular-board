'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('tickets', ['query', function(query) {
        var result = {};

        var addValue = function(key, newValue) {
            var origKey = result[key];
            if(!origKey) {
                result[key] = newValue;
            }
            else {
                result[key] += newValue;
            }
        };                   

        var aggregateNode = function(jsonObj) { //todo rename select node
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    var newValue = jsonObj[key];

                    addValue(key, newValue); // todo change the name                    
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