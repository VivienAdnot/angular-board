'use strict';

angular.module('inchApp')
    .factory('byKind', ['query', 'aggregate', function(query, aggregate) {

        var result = {};

        var aggregateData = function(data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    aggregate.sum(result, key, data[key]);
                }
            }
        };

        var queryAndAggregate = function(callback) {
            query("units_by_kind")
                .then(function(dataArr) {
                    dataArr.forEach(function(response) {
                        aggregateData(response.data);
                    });

                    callback(result);
                })
                .catch(function(reason) {
                    callback(reason);
                });
        };

        return function(callback) {
            return queryAndAggregate(callback);
        };

    }]);