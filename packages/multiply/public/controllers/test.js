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

        //multiply
        $scope.time = 10;//TODO change as 120 second in production
        $scope.firstmin = 100;
        $scope.firstmax = 999;
        $scope.secondmin = 10;
        $scope.secondmax = 99;
        $scope.testNumber = 3;

        $scope.mulIter = -1;
        $scope.mulCur = {};
        $scope.result = 0;

        var timerPromise;

        $scope.startMulTest = function () {
            $scope.phase = 60;
            $scope.mulIter = -1;
            $scope.nextMulTest();
            timer.tik();
        };

        $scope.nextMulTest = function (ans) {
            if (ans !== undefined) {
                $scope.last = judge($scope.mulCur, ans);
            }
            if ($scope.mulIter + 1 < $scope.testNumber) {
                $scope.mulIter += 1;
                $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            } else {
                $scope.duration = parseInt(timer.tok() / 3);
                $scope.phase = 70;
            }
        };

        $scope.startMul = function () {
            $scope.phase = 80;
            $scope.mulIter = -1;
            $scope.nextMul();
            $timeout(function () {
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
                console.log($scope.result + ',' + $scope.mulIter);
                $scope.phase = 90;
            }, 1000 * $scope.time);
        };

        $scope.nextMul = function (ans) {
            if (ans !== undefined) {
                $scope.result += $scope.last = judge($scope.cur, ans);
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
            } else {
                $scope.last = 0;
            }
            var correctUpdate = checker.update($scope.last);
            changeDuration(correctUpdate);

            $scope.mulIter += 1;
            $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            timerPromise = $timeout($scope.nextMul, $scope.duration);
        };

        function changeDuration(correctUpdate) {
            if (correctUpdate === 1) {
                $scope.duration = parseInt($scope.duration * 0.9);
            } else if (correctUpdate === -1) {
                $scope.duration = parseInt($scope.duration * 1.1);
            }
        }

        function judge(cur, ans) {
            var realVal = cur.first * cur.second;
            if (cur.answer[ans] === realVal) {
                return 1;
            } else {
                return 0;
            }
        }

        //multiply ends

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