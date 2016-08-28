'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
    .module('appApp', [
        'ngResource', //todo remove
        'ngRoute',
        'ngMockE2E'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/ticket', {
                templateUrl: 'views/ticket.html',
                controller: 'TicketCtrl',
                controllerAs: 'ticket'
            })
            .when('/bykind', {
                templateUrl: 'views/byKind.html',
                controller: 'ByKindCtrl',
                controllerAs: 'bykind'
            })
            .when('/units', {
                templateUrl: 'views/units.html',
                controller: 'UnitCtrl',
                controllerAs: 'units'
            })
            .otherwise({
                redirectTo: '/ticket'
            });
    })
    .run(function($httpBackend) {
        console.log("running");

        $httpBackend.whenGET(/views\/.*/).passThrough();

        $httpBackend.whenGET("http://example.com/credentials.json")
            .respond([{
                "X-API-EMAIL": "super@example.com",
                "X-API-TOKEN": "fereklwfrh2urfw",
                "server_url": "http://api1.example.com"
            }, {
                "X-API-EMAIL": "super@example.com",
                "X-API-TOKEN": "fereklwfrh2urfw",
                "server_url": "http://api2.example.com"
            }]);

        //server 1

        $httpBackend.whenGET("http://api1.example.com/units_by_kind.json")
            .respond({
                "Apartment": 300,
                "Garage": 50,
                "Cellar": 60
            });

        $httpBackend.whenGET("http://api1.example.com/units.json")
            .respond({
                "total": {
                    "min": 2,
                    "max": 50,
                    "average": 33.5,
                    "weight": 300
                },
                "commonhold": {
                    "min": 35,
                    "max": 50,
                    "average": 40,
                    "weight": 200
                }
            });

        $httpBackend.whenGET("http://api1.example.com/tickets.json")
            .respond({
                "2016-07-01": 10,
                "2016-07-03": 5,
                "2016-07-05": 6
            });

        //server 2

        $httpBackend.whenGET("http://api2.example.com/units.json")
            .respond({
                "total": {
                    "min": 1,
                    "max": 40,
                    "average": 31.5,
                    "weight": 200
                },
                "commonhold": {
                    "min": 20,
                    "max": 40,
                    "average": 30,
                    "weight": 150
                }
            });

        $httpBackend.whenGET("http://api2.example.com/tickets.json")
            .respond({
                "2016-07-01": 5,
                "2016-07-02": 5,
                "2016-07-07": 6
            });

        $httpBackend.whenGET("http://api2.example.com/units_by_kind.json")
            .respond({
                "Apartment": 150,
                "Garage": 20,
                "Ski Locker": 100
            });
    });