'use strict';

angular.module('inchApp')
    .controller('TicketsCtrl', ['tickets', '$scope', function(tickets, $scope) {

        tickets.queryAndAggregate()
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