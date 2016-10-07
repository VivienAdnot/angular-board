'use strict';

/**
 * @ngdoc function
 * @name inchApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('inchApp')
    .factory('query', ['$http', '$q',  function($http, $q) {
        var service = {};

        var servers = {
            "http://api1.example.com": {},
            "http://api2.example.com": {}
        };

        service.fetchAll = function fetchAll(metricsType) {
            var promises = [];

            var keys = Object.keys(servers);

            for (var serverKey in servers) {
                var server = servers[serverKey];

                var completeUrl = serverKey + "/" + metricsType + ".json";

                promises.push($http.get(completeUrl, {
                    headers: server.httpHeaders
                }));

            }

            return $q.all(promises);
        }

        return service;

    }]);