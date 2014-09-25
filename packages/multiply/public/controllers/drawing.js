/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('DrawingController', ['$scope', '$timeout', '$http', 'DataService', function ($scope, $timeout, $http, DataService) {
    $scope.step = 1;

    $scope.onTimeUp = function() {
        /*global $:false */
        $('#alertPlayer').trigger('play');
        alert('时间到，请点击关闭本对话框并按接下来的提示操作。');
        $scope.$apply(function() {
            $scope.step += 1;
        });
    };

    $scope.saveAndNext = function () {
        $scope.$emit('set-phase', 'survey-student');
    };
}]);
