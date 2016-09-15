'use strict';

describe('Controller: TicketsCtrl', function() {
    var $rootScope;
    var $scope;
    var $q;
    var deferred;

    var mockResponse = {
        "2016-07-01": {
            "sum": 15
        },
        "2016-07-03": {
            "sum": 5
        },
        "2016-07-05": {
            "sum": 6
        },
        "2016-07-02": {
            "sum": 5
        },
        "2016-07-07": {
            "sum": 6
        }
    };

        // load the controller's module
    beforeEach(module('inchApp'));

    beforeEach(inject(function($controller, tickets, _$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;

        deferred = _$q_.defer();

        $scope = $rootScope.$new();

        // Use a Jasmine Spy to return the deferred promise by mocking the service
        spyOn(tickets, 'queryAndAggregate').and.returnValue(deferred.promise);

        // Init the controller, passing our spy service instance
        $controller('TicketsCtrl', {
            $scope: $scope,
            tickets: tickets
        });
    }));

    it('should resolve promise', function(done) {
        // Setup the data we wish to return for the .then function in the controller
        deferred.resolve(mockResponse);

        // We have to call apply for this to work
        $scope.$apply();

        // Since we called apply, not we can perform our assertions
        expect($scope.tickets).not.toBe(undefined);
        expect($scope.error).toBe(undefined);
    });

    // it('should resolve promise', function(done) {
    //     // This will call the .catch function in the controller
    //     deferred.reject();

    //     // We have to call apply for this to work
    //     $scope.$apply();

    //     // Since we called apply, not we can perform our assertions
    //     expect($scope.tickets).toBe(undefined);
    //     expect($scope.error).not.toBe(undefined);
    // });
});