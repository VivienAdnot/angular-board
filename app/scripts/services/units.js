'use strict';

angular.module('inchApp')
    .factory('units', ['$q', 'query', 'aggregate', function($q, query, aggregate) {
        var service = {};

        var averageTemp = {};

        var setAverageTemp = function(key, newValue) {
            if(!averageTemp[key]) {
                averageTemp[key] = [];
            }

            averageTemp[key].push(newValue);
        };

        var computeAverage = function() {
            var result = {};
            for (var key in averageTemp) {
                if (averageTemp.hasOwnProperty(key)) {
                    
                    var extract = averageTemp[key];

                    var sum = extract.reduce(function(last, now) {
                        return last + now;
                    }, 0);

                    var average = sum / extract.length;
                    result[key] = average;
                }
            }

            return result;
        };         

        var aggregateData = function(result, data) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var extract = data[key];

                    if(!result[key]) {
                        result[key] = {};
                    }

                    //min
                    aggregate.min(result, key, extract["min"]);

                    //max
                    aggregate.max(result, key, extract["max"]);

                    //average
                    setAverageTemp(key, extract["average"]); // todo change the name

                    //weight
                    aggregate.sum(result, key, extract["weight"], "weight");
                }
            }

            return result;
        };

        service.queryAndAggregate = function queryAndAggregate() {
            var deferred = $q.defer();

            query.fetchAll("units")
                .then(
                    function(dataArr) {
                        var result = {};

                        dataArr.reduce(function(last, now) {
                            return aggregateData(result, now.data);
                        }, 0);

                        result["average"] = computeAverage();
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