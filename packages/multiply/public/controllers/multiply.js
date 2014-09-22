'use strict';

angular.module('mean.multiply').controller('MultiplyController', ['$scope', '$timeout', 'Global', 'Multiply', 'Timer',
    'CorrectCheck', 'MulQuestions', 'DataService', function ($scope, $timeout, Global, Multiply, timer, checker, mulQues, DataService) {
        $scope.step = 1;

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
            $scope.step ++;
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
                $scope.step ++;
            }
        };

        $scope.startMul = function () {
            $scope.step ++;
            $scope.mulIter = -1;
            $scope.nextMul();
            $timeout(function () {
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
                console.log($scope.result + ',' + $scope.mulIter);
                $scope.step ++;
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

        $scope.saveAndNext = function () {
            // TODO Go to next phase.
            DataService.setData('multiply-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'timer');
        };
    }]);
