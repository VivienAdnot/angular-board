angular.module('appApp')
    .factory('aggregate', function() {
        var initDateSource = function(dataSource, key) {
            dataSource = dataSource || {};
            dataSource[key] = dataSource[key] || {};
        };

        var min = function(dataSource, key, newValue) {
            initDateSource(dataSource, key);

            if(!dataSource[key]["min"] || newValue < dataSource[key]["min"]) {
                dataSource[key]["min"] = newValue;
            }
        };

        var max = function(dataSource, key, newValue) {
            initDateSource(dataSource, key);

            if(!dataSource[key]["max"] || newValue > dataSource[key]["max"]) {
                dataSource[key]["max"] = newValue;
            }
        };

        var sum = function(dataSource, key, newValue) {
            initDateSource(dataSource, key);

            if(!dataSource[key]["sum"]) {
                dataSource[key]["sum"] = 0;
            }

            dataSource[key]["sum"] += newValue;
        };

        return {
            min: min,
            max: max,
            sum: sum
        }
    });