'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('tickets', ['$http', function($http) {

        var dataSourcePool = [
            "tickets_1.json",
            "tickets_2.json"
        ];

        var result = {};

        var counter = 0;

        var aggregateNode = function(id, jsonObj) {
            result[id] = jsonObj;
        };

        var fetchAll = function(callback) {
            for (var index = 0; index < dataSourcePool.length; index++) {
                var url = dataSourcePool[index];

                $http.get("json/" + url)
                .then(function(response) {
                    aggregateNode(url, response.data);

                    counter++;
                    if(counter == dataSourcePool.length) {
                        callback(result);
                    }
                });
            }
        };

        return function(callback) {
            return fetchAll(callback);
        };

    }]);