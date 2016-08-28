'use strict';

angular.module('inchApp')
    .factory('tickets', ['query', 'aggregate', function(query, aggregate) {
        var result = {};

        var aggregateData = function(data) { //todo rename select node
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    aggregate.sum(result, key, data[key]);
                }
            }
        };

        var queryAndAggregate = function(callback) {
            var queryCallback = function(error, data, last) {
                if(error) {
                    callback(error);
                    return;
                }

                aggregateData(data);
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