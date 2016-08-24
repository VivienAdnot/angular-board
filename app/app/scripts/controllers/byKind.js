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
  .controller('ByKindCtrl', [ 'byKind', '$scope', function (byKind, $scope) {
    $scope.byKind = byKind();
  }]
);
