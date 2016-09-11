'use strict';

angular.module('inchApp')
    .factory('tickets', ['$q', 'query', 'aggregate', function($q, query, aggregate) {
        var result = {};

        var aggregateData = function(data) { //todo rename select node
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    aggregate.sum(result, key, data[key]);
                }
            }
        };

        var queryAndAggregate = function(callback) {
            query("tickets", function(promises) {
                $q.all(promises).then(function(dataArr) {

                    dataArr.forEach(function(response) {
                        aggregateData(response.data);
                    });

                    callback(result);
                }, function(reason) {
                    callback(reason);
                });
            });
        };

        return function(callback) {
            return queryAndAggregate(callback);
        };        

    }]);