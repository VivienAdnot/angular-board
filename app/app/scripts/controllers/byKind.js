'use strict';

angular.module('inchApp')
    .controller('ByKindCtrl', ['byKind', '$scope', function(byKind, $scope) {

        byKind.queryAndAggregate()
            .then(
                function(aggregated) {
                    $scope.byKind = aggregated;
                },
                function(error) {
                    $scope.byKind = error;
                }
            )
            .catch(function(reason) {
                $scope.byKind = reason;
            });
    }]);