/**
 * Created by fengchao on 14-9-21.
 */
'use strict';

angular.module('mean.multiply').controller('TestController', ['$scope', '$http', '$timeout', 'Global', 'Multiply', 'Timer', 'CorrectCheck', 'MulQuestions',
    function ($scope, $http, $timeout, Global, Multiply, timer, checker, mulQues) {
        $scope.global = Global;
        $scope.phase = 'standby';

        $scope.$on('set-phase', function (event, phase) {
            $scope.phase = phase;
        });

        $scope.startTest = function () {
            $scope.phase = 'word';
        };
    }
]);
