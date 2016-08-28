'use strict';

angular.module('inchApp')
  .controller('ByKindCtrl', [ 'byKind', '$scope', function (byKind, $scope) {
    
    byKind(function(data) {
      $scope.byKind = data;
    });
    
  }]
);
