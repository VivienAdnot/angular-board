'use strict';

angular.module('inchApp')
    .factory('units', ['query', 'aggregate', function(query, aggregate) {

        var result = {};

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
                    var sum = 0;

                    for(var i = 0; i < extract.length; i++) {
                        sum += extract[i];
                    }

                    var average = sum / extract.length;
                    result[key] = average;
                }
            }

            return result;
        };                    

        var aggregateData = function(data) {
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

                    //weight (todo: what should I do ? take the heavier ?)
                    aggregate.sum(result, key, extract["weight"], "weight");
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
                    result["average"] = computeAverage();
                    callback(result);
                }
            };

            query("units", queryCallback);
        };

        return function(callback) {
            return queryAndAggregate(callback);
        };            

    }]);