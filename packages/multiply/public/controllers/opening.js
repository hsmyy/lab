/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController', ['$scope', function ($scope) {
    $scope.startTest = function () {
        $scope.$emit('set-phase', 'word');
    };
}]);
