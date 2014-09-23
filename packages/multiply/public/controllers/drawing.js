/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('DrawingController', ['$scope', '$timeout', '$http', 'DataService', function ($scope, $timeout, $http, DataService) {
    $scope.step = 1;

    // TODO Start a timer.
    // 1. Count for 10 min and go to step 2;
    // 2. Count for 10 min and go to step 3;
    // 3. Count for 10 min and show the next button.

    $scope.saveAndNext = function () {
        $scope.$emit('set-phase', 'survey-student');
    };
}]);
