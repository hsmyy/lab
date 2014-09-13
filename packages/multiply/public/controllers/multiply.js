'use strict';

angular.module('mean.multiply').controller('MultiplyController', ['$scope', '$timeout', 'Global', 'Multiply', 'Timer', 'CorrectCheck',
    function($scope, $timeout, Global, Multiply, timer, correct) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.cur = {};
        $scope.iter = 0;
        $scope.result = 0;
        $scope.last = -1;

        var START_TEST_PHASE = 1;
        var END_TEST_PHASE = 2;
        var START_PHASE = 3;
        var END_PHASE = 4;

        //TODO create one timer
        var timerPromise;
        $scope.duration = 0;

        //parameter
        $scope.time = 120;
        $scope.firstmin = 100;
        $scope.firstmax = 999;
        $scope.secondmin = 10;
        $scope.secondmax = 99;
        $scope.testNumber = 3;

        $scope.start = function(phase){
            $scope.phase = phase;
            $scope.iter = -1;
            $scope.next();
            if(phase === START_TEST_PHASE){
                timer.tik();
            }else if(phase === START_PHASE){
                $scope.result = 0;
                $timeout(finish,1000 * $scope.time);
            }
        };

        $scope.nextTest = function(ans){
            $scope.result += $scope.last = judge($scope.cur, ans);
            if($scope.iter + 1 < $scope.testNumber){
                $scope.iter = $scope.iter + 1;
                $scope.cur = randMultiply($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            }else{
                finish();
            }
        };

        $scope.next = function(ans){
            if(ans !== undefined){
                $scope.result += $scope.last = judge($scope.cur, ans);
                var correctUpdate = correct.update($scope.last);
                changeDuration(correctUpdate);
                if($scope.phase === START_PHASE){
                    $timeout.cancel(timerPromise);
                }
            }
            $scope.iter = $scope.iter + 1;
            $scope.cur = randMultiply($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            if($scope.phase === START_PHASE){
                timerPromise = $timeout($scope.next, $scope.duration);
            }
        };

        function changeDuration(correctUpdate){
            if(correctUpdate === 1){
                $scope.duration = parseInt($scope.duration * 0.9);
            }else if(correctUpdate === -1){
                $scope.duration = parseInt($scope.duration * 1.1);
            }
        }

        function finish(){
            if($scope.phase === START_TEST_PHASE){
                $scope.duration = parseInt(timer.tok() / 3);
                console.log($scope.duration);
                $scope.phase = END_TEST_PHASE;
            }else if($scope.phase === START_PHASE){
                $scope.phase = END_PHASE;
            }
        }

        function judge(cur, ans){
            var realVal = cur.first * cur.second;
            if(cur.answer[ans] === realVal){
                return 1;
            }else{
                return 0;
            }
        }

        function randMultiply(firstmin, firstmax, secondmin, secondmax){
            var three = parseInt(Math.random() * (firstmax - firstmin) + firstmin);
            var two = parseInt(Math.random() * (secondmax - secondmin) + secondmin);
            var answer = three * two;
            var digit = (parseInt(answer / 10) + parseInt(1 + Math.random() * 8)) % 10;
            var fakeAnswer = parseInt((answer % 10) + (digit * 10) + (parseInt(answer / 100) * 100));
            var index = Math.random() > 0.5 ? 0 : 1;
            var answers = [];
            answers[index] = answer;
            answers[1 - index] = fakeAnswer;
            return {
                'first' : three,
                'second' : two,
                'answer' : answers
            };
        }
    }
]);
