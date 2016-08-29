'use strict';

describe('Service: aggregate', function() {

    // load the controller's module
    beforeEach(module('inchApp'));

    var aggregate;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_aggregate_) {
        aggregate = _aggregate_;
    }));

    it('should exist', function() {
        expect(aggregate).toBeDefined();
    });

    it('min', function() {
        var dataSource = {};
        aggregate.min(dataSource, "test", 3);
        expect(dataSource.test.min).toBe(3);

        aggregate.min(dataSource, "test", 4);
        expect(dataSource.test.min).toBe(3);

        aggregate.min(dataSource, "test", 2);
        expect(dataSource.test.min).toBe(2);      
    });

    it('max', function() {
        var dataSource = {};
        aggregate.max(dataSource, "test", 3);
        expect(dataSource.test.max).toBe(3);

        aggregate.max(dataSource, "test", 4);
        expect(dataSource.test.max).toBe(4);

        aggregate.max(dataSource, "test", 2);
        expect(dataSource.test.max).toBe(4);      
    });

    it('sum', function() {
        var dataSource = {};
        aggregate.sum(dataSource, "test", 3);
        expect(dataSource.test.sum).toBe(3);

        aggregate.sum(dataSource, "test", 4);
        expect(dataSource.test.sum).toBe(7);

        aggregate.sum(dataSource, "test", 2);
        expect(dataSource.test.sum).toBe(9);      
    });    
});