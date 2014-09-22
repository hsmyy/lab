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

        //timer
        $scope.timerPhase = function () {
            $scope.phase = 100;

            $timeout(function () {
                $scope.phase = 120;
            }, 10 * 1000);//TODO change as 10 minutes when in production

            $timeout(function () {
                $scope.phase = 130;
            }, 20 * 1000);//TODO change as 20 minutes when in production

            $timeout(function () {
                $scope.phase = 140;
            }, 30 * 1000);//TODO change as 30 minutes when in production
        };
        //timer end
    }
]);