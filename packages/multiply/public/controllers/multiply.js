'use strict';

angular.module('mean.multiply').controller('MultiplyController', ['$scope', '$timeout', 'Global', 'Multiply',
    function($scope, $timeout, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.cur = {};
        $scope.iter = 0;
        $scope.result = 0;
        $scope.last = -1;
        //parameter
        $scope.time = 10;
        $scope.firstmin = 100;
        $scope.firstmax = 999;
        $scope.secondmin = 10;
        $scope.secondmax = 99;

        $scope.start = function(){
            $scope.phase = 1;
            $scope.cur = randMultiply();
            $scope.iter = 0;

            $timeout(finish,1000 * $scope.time);
        };

        $scope.next = function(ans){
          $scope.result += judge(ans);
          $scope.iter = $scope.iter + 1;
          $scope.cur = randMultiply();
        };

        function finish(){
            $scope.phase = 2;
        }

        function judge(ans){
            var realVal = $scope.cur.first * $scope.cur.second;

            if($scope.cur.answer[ans] === realVal){
                $scope.last = 1;
                return 1;
            }else{
                $scope.last = 0;
                return 0;
            }
        }

        function randMultiply(){
            var three = Math.floor(Math.random() * ($scope.firstmax - $scope.firstmin) + $scope.firstmin);
            var two = Math.floor(Math.random() * ($scope.secondmax - $scope.secondmin) + $scope.secondmin);
            var answer = three * two;
            var digit = (parseInt(answer / 10) + 1) % 10;
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
