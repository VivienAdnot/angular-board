'use strict';

angular.module('inchApp')
    .controller('TicketsCtrl', ['tickets', '$scope', function(tickets, $scope) {

        tickets.queryAndAggregate()
            .then(
                function(aggregated) {
                    $scope.tickets = aggregated;
                },
                function(error) {
                    $scope.tickets = error;
                }
            )
            .catch(function(reason) {
                $scope.tickets = reason;
            });
    }]);