'use strict';

angular.module('inchApp')
  .controller('UnitCtrl', [ 'units', '$scope', function (units, $scope) {
    
    units(function(data) {
      $scope.units = data;
    });
    
  }]
);
