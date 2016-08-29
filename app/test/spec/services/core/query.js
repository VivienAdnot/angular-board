'use strict';

describe('Service: query', function() {

    // load the controller's module
    beforeEach(module('inchApp'));

    var query;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_query_) {
        query = _query_;
    }));

    it('should exist', function() {
        expect(query).toBeDefined();
    });

    it('fetch all', function(done) {
        var counter = 0;
        
        var queryCallback = function(error, data, last) {
            counter++;
            expect(error).toBeNull();
            expect(data).toBeDefined();

            if(last) {
                expect(counter).toBe(1);
                done();
            }
        };

        query("units_by_kind", queryCallback);
    });    
});