'use strict';

angular.module('mean.multiply').controller('MultiplyController',
    ['$scope', '$timeout', 'Global', 'Multiply', 'Timer',
    'CorrectCheck', 'MulQuestions', 'DataService', 'Config',
        function ($scope, $timeout, Global, Multiply, timer,
                  checker, mulQues, DataService, config) {
        $scope.step = 1;

        $scope.time = config.multiple;//TODO change as 120 second in production
        $scope.firstmin = config.mul_first_min;
        $scope.firstmax = config.mul_first_max;
        $scope.secondmin = config.mul_second_min;
        $scope.secondmax = config.mul_second_max;
        $scope.testNumber = config.mul_test_num;

        $scope.mulIter = -1;
        $scope.mulCur = {};
        $scope.result = 0;

        $scope.rank = 10;

        $scope.stage = 'cal';

        var timerPromise;
        $('#heartBeat').trigger('play');
        $scope.startMulTest = function () {
            $scope.step += 1;
            $scope.mulIter = -1;
            $scope.nextMulTest();
            timer.tik();
            console.log('[MUL]Test Start');
            /*global $:false */

        };

        $scope.nextMulTest = function (ans) {
            if (ans !== undefined) {
                $scope.last = judge($scope.mulCur, ans);
                /*global $:false */
                $scope.stage = 'ans';
                $('#mulTestTimer')[0].start();
            }
            $scope.mulIter += 1;
            if ($scope.mulIter + 1 <= $scope.testNumber) {
                $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            } else {
                $scope.duration = parseInt(timer.tok() / 3);
            }

            console.log('[MUL]Test Next');
        };

        $scope.onTestTimeUp = function(){
            $scope.$apply(function(){
                if($scope.mulIter + 1 <= $scope.testNumber){
                    $scope.stage = 'cal';
                }else{
                    console.log('[MUL]Test Time up');
                    $scope.step += 1;
                }
            });

            console.log('[MUL]Test timeup');
        };

        $scope.startMul = function () {
            $scope.step += 1;
            $scope.mulIter = -1;
            //small bug, hot fix
            var lastAns = $scope.last;
            $scope.mulIter += 1;
            $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            //$scope.nextMul();
            $scope.last = lastAns;
            $scope.stage = 'cal';
            timerPromise = $timeout($scope.nextMul, $scope.duration);

            console.log('[MUL]Normal Start');
            $timeout(function () {
                if (timerPromise !== undefined) {
                    $timeout.cancel(timerPromise);
                }
                //console.log($scope.result + ',' + $scope.mulIter);
                console.log('[MUL]Normal Time up');
                $scope.step += 1;
            }, 1000 * $scope.time);
        };

        $scope.onTimeUp = function(){
            $scope.$apply(function(){
                $scope.stage = 'cal';
                timerPromise = $timeout($scope.nextMul, $scope.duration);
            });

            console.log('[MUL]Normal Timeup');
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
                $scope.rank -= parseInt(Math.random() * 5) + 1;
                if($scope.rank < 0){
                    $scope.rank = 0;
                }
            }else{
                $scope.rank += parseInt(Math.random() * 10) + 4;
                if($scope.rank > 19){
                    $scope.rank = 19;
                }
            }

            var correctUpdate = checker.update($scope.last);
            changeDuration(correctUpdate);

            $scope.mulIter += 1;
            $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);

            $scope.stage = 'ans';
            /*global $:false */
            $('#mulTimer')[0].start();

            console.log('[MUL]Normal Next');
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
            //$scope.$emit('set-phase', 'survey2');
            $('#heartBeat').trigger('pause');
            console.log('[MUL]Go to TuoYe3');
            $scope.$emit('set-phase', 'tuoye3');
        };
    }]);
