'use strict';

describe('Service: query', function() {
    var query;
    var result;

    // load the controller's module
    beforeEach(function(done) {
        module('inchApp');

        inject(function(_query_) {
            query = _query_;
        });

        var queryCallback = function(error, data, last) {
            result.push({
                error: error,
                data: data
            });

            if(last) {
                done();
            }
        };

        query("units_by_kind", queryCallback);
    });
    
    
    var query;

    // Initialize the controller and a mock scope
    // beforeEach(inject(function(_query_) {
    //     query = _query_;
    // }));

    it('should exist', function() {
        expect(query).toBeDefined();
    });

    it('should return a result', function () {  
        expect(result).toBeDefined();
    });

    // it('fetch all', function(done) {
    //     var counter = 0;
        
    //     var queryCallback = function(error, data, last) {
    //         counter++;
    //         expect(error).toBeNull();
    //         expect(data).toBeDefined();

    //         if(last) {
    //             expect(counter).toBe(1);
    //             done();
    //         }
    //     };

    //     query("units_by_kind", queryCallback);
    // });    
});