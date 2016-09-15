'use strict';

angular.module('inchApp')
    .controller('ByKindCtrl', ['byKind', '$scope', function(byKind, $scope) {

        byKind.queryAndAggregate()
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