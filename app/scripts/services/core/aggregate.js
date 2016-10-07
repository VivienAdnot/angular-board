angular.module('inchApp')
    .factory('aggregate', function() {
        var initDateSource = function(dataSource, key) {
            dataSource = dataSource || {};
            dataSource[key] = dataSource[key] || {};
        };

        var min = function(dataSource, key, newValue, aggregateIdentifier) {
            initDateSource(dataSource, key);
            aggregateIdentifier = aggregateIdentifier || "min";

            if(!dataSource[key][aggregateIdentifier] || newValue < dataSource[key][aggregateIdentifier]) {
                dataSource[key][aggregateIdentifier] = newValue;
            }

            return dataSource;
        };

        var max = function(dataSource, key, newValue, aggregateIdentifier) {
            initDateSource(dataSource, key);
            aggregateIdentifier = aggregateIdentifier || "max";

            if(!dataSource[key][aggregateIdentifier] || newValue > dataSource[key][aggregateIdentifier]) {
                dataSource[key][aggregateIdentifier] = newValue;
            }

            return dataSource;
        };

        var sum = function(dataSource, key, newValue, aggregateIdentifier) {
            initDateSource(dataSource, key);
            aggregateIdentifier = aggregateIdentifier || "sum";

            if(!dataSource[key][aggregateIdentifier]) {
                dataSource[key][aggregateIdentifier] = 0;
            }

            dataSource[key][aggregateIdentifier] += newValue;
            
            return dataSource;
        };

        return {
            min: min,
            max: max,
            sum: sum
        }
    });