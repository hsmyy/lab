'use strict';

angular.module('mean.multiply').controller('TimerController', ['$scope', '$timeout', '$http', 'Global', 'Multiply',
    function($scope, $timeout, $http, Global, Multiply) {
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
    }
]);
