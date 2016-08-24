'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('byKind', ['dataFetcher', function(dataFetcher) {

        var dataSource = dataFetcher.fetchAll("unitsByKind");
        var aggregated = {};

        // todo aggregate must be done after each fetch, not after fetchAll.
        var aggregate = function() {
            var eachNode = function(jsonObj) {
                for (node in jsonObj) {
                    if (jsonObj.hasOwnProperty(node)) {
                        if (aggregated.hasOwnProperty(node) == true) {
                            var oldSum = result[node];
                            aggregated[node] = oldSum + jsonObj[node];
                        } else {
                            aggregated[node] = jsonObj[node];
                        }
                    }
                }
                return aggregated;
            };

            for (key in Object.keys(dataSource)) {
                if (dataSource.hasOwnProperty(key)) {
                    eachNode(dataSource[key]);
                }
            }
        };

        return function() {
            return aggregate();
        };

    }]);