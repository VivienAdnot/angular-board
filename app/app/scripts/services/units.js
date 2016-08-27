'use strict';

/**
 * @ngdoc function
 * @name appApp.service:Ticket
 * @description
 * # TicketService
 * Service to fetch tickets
 */
angular.module('appApp')
    .factory('units', ['query', function(query) { // todo factorize by kind, units and tickets

        var result = {};

        var averageTemp = {};

        var setMin = function(key, newValue) {
            var origKey = result[key]["min"];

            if(!origKey || newValue < origKey) {
                result[key]["min"] = newValue;
            }
        };

        var setMax = function(key, newValue) {
            var origKey = result[key]["max"];

            if(!origKey || newValue > origKey) {
                result[key]["max"] = newValue;
            }
        };
        
        var setAverageTemp = function(key, newValue) {
            var origKey = averageTemp[key];

            if(!origKey) {
                averageTemp[key] = [];
            }

            averageTemp[key].push(newValue);
        };

        var addWeight = function(key, newValue) {
            var origKey = result[key]["weight"];
            if(!origKey) {
                result[key]["weight"] = newValue;
            }
            else {
                result[key]["weight"] += newValue;
            }
        };

        var computeAverage = function() {
            var result = {};
            for (var key in averageTemp) {
                if (averageTemp.hasOwnProperty(key)) {
                    
                    var subArray = averageTemp[key];
                    var sum = 0;

                    for(var i = 0; i < subArray.length; i++) {
                        sum += subArray[i];
                    }

                    var average = sum / subArray.length;
                    result[key] = average;
                }
            }

            return result;
        };                    

        var aggregateNode = function(jsonObj) {
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    var subObject = jsonObj[key];

                    if(!result[key]) {
                        result[key] = {};
                    }

                    //min
                    var minNewValue = subObject["min"]; // todo variable name as enum
                    setMin(key, minNewValue); // todo change the name

                    //max
                    var maxNewValue = subObject["max"]; // todo variable name as enum
                    setMax(key, maxNewValue); // todo change the name

                    //average
                    var averageNewValue = subObject["average"]; // todo variable name as enum
                    setAverageTemp(key, averageNewValue); // todo change the name

                    //weight (todo: what should I do ? take the heavier ?)
                    var weightNewValue = subObject["weight"]; // todo variable name as enum
                    addWeight(key, weightNewValue); // todo change the name                    
                }
            }
        };

        var queryAndAggregate = function(callback) {
            var queryCallback = function(error, data, last) {
                if(error) {
                    callback(error);
                    return;
                }

                aggregateNode(data);
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