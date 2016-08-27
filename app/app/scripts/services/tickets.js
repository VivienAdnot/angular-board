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

        var fetchAll = function(callback) {
            for (var index = 0; index < dataSourcePool.length; index++) {
                var url = dataSourcePool[index];

                $http.get("json/" + url)
                .then(function(response) {
                    aggregateNode(response.data); // todo rename aggregateNode => aggregateResponse

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