'use strict';

angular.module('inchApp')
    .controller('UnitCtrl', ['units', '$scope', function(units, $scope) {

        units.queryAndAggregate()
            .then(
                function(aggregated) {
                    $scope.units = aggregated;
                },
                function(error) {
                    $scope.units = error;
                }
            )
            .catch(function(reason) {
                $scope.byKind = reason;
            });
    }]);