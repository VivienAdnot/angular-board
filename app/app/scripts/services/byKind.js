'use strict';

angular.module('inchApp')
    .factory('byKind', ['$q', 'query', 'aggregate', function($q, query, aggregate) {
        var service = {};

        var aggregateData = function(result, data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    aggregate.sum(result, key, data[key]);
                }
            }

            return result;
        };

        service.queryAndAggregate = function queryAndAggregate() {
            var deferred = $q.defer();

            query.fetchAll("units_by_kind")
                .then(
                    function(dataArr) {
                        var result = {};

                        dataArr.reduce(function(last, now) {
                            return aggregateData(result, now.data);
                        }, 0);

                        deferred.resolve(result);
                    },
                    function(error) {
                        deferred.reject(error);
                    }
                )
                .catch(function(reason) {
                    deferred.reject(reason);
                });

            return deferred.promise;
        };

        return service;
    }]);