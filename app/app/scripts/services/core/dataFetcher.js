'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('dataFetcher', function($http) {
        var urlPrefix = "json/";

        var isSourceTypeAvailable = function(dataSource) {
            return dataSource && dataSource.length > 0;
        };

        var dataSourcePool = {
            "tickets": [
                "tickets_1.json",
                "tickets_2.json"
            ],
            "units": [
                "units_1.json",
                "units_2.json"
            ],
            "unitsByKind": [
                "units_by_kind_1.json",
                "units_by_kind_2.json"
            ]
        };

        var fetchAll = function(sourceType) {
            var dataSource = dataSourcePool[sourceType];
            if (!isSourceTypeAvailable(dataSource)) {
                return {};
            }

            var result = {};

            for (var index = 0; index < dataSource.length; index++) {
                var url = dataSource[index];

                $http.get(urlPrefix + url).then(function(response) {
                    result[index] = response.data;
                });
            }

            return result;
        };

        return {
            fetchAll: fetchAll
        };
    });