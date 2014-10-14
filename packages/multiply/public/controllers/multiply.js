'use strict';

angular.module('mean.multiply').controller('MultiplyController', ['$scope', '$timeout', 'Global', 'Multiply', 'Timer',
    'CorrectCheck', 'MulQuestions', 'DataService', function ($scope, $timeout, Global, Multiply, timer, checker, mulQues, DataService) {
        $scope.step = 1;

        $scope.time = 10;//TODO change as 120 second in production
        $scope.firstmin = 10;
        $scope.firstmax = 99;
        $scope.secondmin = 10;
        $scope.secondmax = 99;
        $scope.testNumber = 3;

        $scope.mulIter = -1;
        $scope.mulCur = {};
        $scope.result = 0;

        $scope.rank = 50;

        var timerPromise;

        $scope.startMulTest = function () {
            $scope.step += 1;
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
                $scope.step += 1;
            }
        };

        $scope.startMul = function () {
            $scope.step += 1;
            $scope.mulIter = -1;
            //small bug, hot fix
            var lastAns = $scope.last;
            $scope.nextMul();
            $scope.last = lastAns;
            $timeout(function () {
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
                //console.log($scope.result + ',' + $scope.mulIter);
                $scope.step += 1;
            }, 1000 * $scope.time);
        };

        $scope.nextMul = function (ans) {
            if (ans !== undefined) {
                $scope.result += $scope.last = judge($scope.mulCur, ans);
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
            } else {
                $scope.last = 2;
            }
            if($scope.last === 1){
                $scope.rank -= parseInt(Math.random() * 5) + 2;
                if($scope.rank < 0){
                    $scope.rank = 0;
                }
            }else{
                $scope.rank += parseInt(Math.random() * 10) + 5;
                if($scope.rank > 99){
                    $scope.rank = 99;
                }
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
            DataService.setData('multiply-answer', angular.copy({
                'result' : $scope.result,
                'num' : $scope.mulIter
            }));
            $scope.$emit('set-phase', 'survey2');
        };
    }]);