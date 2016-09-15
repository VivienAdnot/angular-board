// 'use strict';

// describe('Service: byKind', function() {

//     // load the controller's module
//     beforeEach(module('inchApp'));

//     var query;
//     var aggregate;
//     var $q;

//     var mockResponse = [{
//         "Apartment": 300,
//         "Garage": 50,
//         "Cellar": 60
//     }, {
//         "Apartment": 150,
//         "Garage": 20,
//         "Ski Locker": 100
//     }];

//     // Initialize the controller and a mock scope
//     beforeEach(inject(function(_$q_, _query_, _aggregate_) {
//         $q = _$q_;
//         query = _query_;
//         aggregate = _aggregate_;

//         deferred = _$q_.defer();

//         spyOn(query).and.returnValue(deferred.promise);
//     }));

//     it('should exist', function() {
//         expect(query).toBeDefined();
//         expect(aggregate).toBeDefined();
//     });

//     it('should resolve promise', function() {
//         deferred.resolve(mockResponse);

//         expect(query).toBeDefined();
//         expect(aggregate).toBeDefined();
//     });
// });