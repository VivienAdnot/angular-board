'use strict';

angular.module('inchApp')
    .controller('UnitCtrl', ['units', '$scope', function(units, $scope) {

        units.queryAndAggregate()
            .then(
                function(aggregated) {
                    $scope.results = aggregated;
                },
                function(error) {
                    $scope.error = error;
                }
            )
            .catch(function(reason) {
                $scope.error = reason;
            });
    }]);