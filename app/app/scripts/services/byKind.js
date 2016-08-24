'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('byKind', ['$http', function($http) {

        var dataSourcePool = [
            "units_by_kind_1.json",
            "units_by_kind_2.json"
        ];

        var result = {};

        var counter = 0;

        var aggregateNode = function(jsonObj) {
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    var oldSum = result[key] || 0;
                    result[key] = oldSum + jsonObj[key];
                }
            }
        };

        var fetchAll = function(callback) {
            for (var index = 0; index < dataSourcePool.length; index++) {
                var url = dataSourcePool[index];

                $http.get("json/" + url)
                .then(function(response) {
                    aggregateNode(response.data);

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