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
            if(phase === START_TEST_PHASE){
                $scope.nextTest();
                timer.tik();
            }else if(phase === START_PHASE){
                $scope.next();
                $scope.result = 0;
                $timeout(finish,1000 * $scope.time);
            }
        };

        $scope.nextTest = function(ans){
            if(ans !== undefined){
                $scope.result += $scope.last = judge($scope.cur, ans);
            }
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
                if($scope.phase === START_PHASE){
                    $timeout.cancel(timerPromise);
                }
            }else{
                $scope.last = 0;
            }
            var correctUpdate = correct.update($scope.last);
            console.log(correctUpdate);
            changeDuration(correctUpdate);

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
            var right10digit = parseInt(answer / 10) % 10;
            var right100digit = parseInt(answer / 100) % 10;
            var wrong10digit = (right10digit + parseInt(1 + Math.random() * 8)) % 10;
            var wrong100digit = (right100digit + parseInt(1 + Math.random() * 8)) % 10;
            var lastDigit = answer % 10;
            var prefix = parseInt(answer / 1000) * 1000;
            var originAnswer = [answer];
            originAnswer.push(prefix + right100digit * 100 + wrong10digit * 10 + lastDigit);
            originAnswer.push(prefix + wrong100digit * 100 + right10digit * 10 + lastDigit);
            originAnswer.push(prefix + wrong100digit * 100 + wrong10digit * 10 + lastDigit);

            var index = parseInt(Math.random() * 4);
            //swap
            var temp = originAnswer[0];
            originAnswer[0] = originAnswer[index];
            originAnswer[index] = temp;

            return {
                'first' : three,
                'second' : two,
                'answer' : originAnswer
            };
        }
    }
]);
