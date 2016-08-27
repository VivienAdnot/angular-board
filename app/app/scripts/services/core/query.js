'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('query', ['$http', function($http) {
        var credentialsSet = false;

        var servers = {
            "http://api1.example.com": {
                name: "server1"
            },
            "http://api2.example.com": {
                name: "server2"
            }
        };

        var counter = 0;
        var last = false;
        
        var credentialsCounter = 0;

        var completeServer = function(server, credentials) {
            server.httpHeaders = {
                "X-API-EMAIL" : credentials["X-API-EMAIL"], // handle invalid object
                "X-API-TOKEN" : credentials["X-API-TOKEN"]
            };
        }

        var fetchCredentials = function(callback) {// todo set real url http://example.com/credentials.json and mock it
            $http.get("json/credentials/credentials.json")
            .then(function(response) {
                var responseData = response.data;

                var keys = Object.keys(responseData);

                for(var key in keys) {
                    var credentials = responseData[key];
                    var urlIdentifier = credentials["server_url"];

                    var server = servers[urlIdentifier];
                    if(!server) {
                        callback("invalid credential", null);
                        return;
                    }

                    completeServer(server, credentials);

                    credentialsCounter++;
                    if(credentialsCounter == keys.length) {
                        credentialsSet = true;
                        callback(null, "success");
                    }
                }
            },
            function(response) {
                console.error("vivien catch error");
                console.error(response);
            });
        };

        var setCredentials = function(callback) {
            if(credentialsSet) {
                callback(null, "success");
                return;
            }
            
            fetchCredentials(callback);
        };

        var fetchAll = function(metricsType, callback) {
            var credentialsCallback = function() {
                var keys = Object.keys(servers);

                for (var serverKey in servers) {
                    var server = servers[serverKey];

                    //var completeUrl = serverKey + "/" + server.name + "/" + metricsType + ".json"; //todo mock
                    var completeUrl = "json" + "/" + server.name + "/" + metricsType + ".json";

                    $http.get(completeUrl, {
                        headers: server.httpHeaders
                    })
                    .then(function(response) {
                        counter++;
                        if(counter == keys.length) {
                            last = true;
                        }

                        callback(null, response.data, last);
                    },
                    function(response) {
                        console.error("vivien catch error:");
                        console.error(response);
                    });
                }
            };

            setCredentials(function(error, data) {
                if(error) {
                    callback("error while fetching credentials", null);
                    return;
                }

                credentialsCallback();
            });
        };

        return function(metricsType, callback) {
            return fetchAll(metricsType, callback);
        };

    }]);