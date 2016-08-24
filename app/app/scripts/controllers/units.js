'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
// todo remove $scope from declarations, we don't have to do it'
  .controller('UnitCtrl', [ 'units', '$scope', function (units, $scope) {
    
    units(function(data) {
      $scope.units = data;
    });
    
  }]
);
