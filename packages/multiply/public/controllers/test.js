/**
 * Created by fengchao on 14-9-21.
 */
'use strict';

angular.module('mean.multiply').controller('TestController', ['$scope', '$http', '$timeout', 'Global', 'Multiply', 'Timer', 'CorrectCheck', 'MulQuestions',
    function($scope, $http, $timeout, Global, Multiply, timer, checker, mulQues) {
        $scope.global = Global;
        $scope.phase = 0;

        $scope.setPhase = function(p){
            $scope.phase = p;
        };

        //word
        $http.get('multiply/words').success(function(data){
            $scope.wordSet = data;
        }).error(function(data, status){
            $scope.wordSet = [{
                'ques' : '大妈摔倒了你扶不扶',
                'res' : true
            },{
                'ques' : '大妈摔倒了你扶不扶',
                'res' : false
            }];
        });

        $scope.wordCur = -1;
        $scope.wordAnswer = [];
        $scope.wordAttention = 0;
        $scope.startWord = function(){
            $scope.phase = 2;
            $scope.wordCur = -1;
            timerWord();
            $timeout(function(){
                $scope.phase = 3;
            },5000);//TODO change as 120*1000 when in production
        };

        function timerWord(){
            $scope.wordAttention = 1;
            $scope.wordCur += 1;
            $timeout(function(){
                $scope.wordAttention = 2;
            }, 100);
        }

        $scope.wordAns = function(ans){
            $scope.wordAnswer.push({
                'id' : $scope.wordCur,
                'result' : 1 - (ans^$scope.wordSet[$scope.wordCur].res)
            });
            timerWord();
        };
        //word ends

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

        $scope.startMulTest = function(){
            $scope.phase = 6;
            $scope.mulIter = -1;
            $scope.nextMulTest();
            timer.tik();
        };

        $scope.nextMulTest = function(ans){
            if(ans !== undefined){
                $scope.last = judge($scope.mulCur, ans);
            }
            if($scope.mulIter + 1 < $scope.testNumber){
                $scope.mulIter += 1;
                $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            }else{
                $scope.duration = parseInt(timer.tok() / 3);
                $scope.phase = 7;
            }
        };

        $scope.startMul = function(){
            $scope.phase = 8;
            $scope.mulIter = -1;
            $scope.nextMul();
            $timeout(function(){
                if(timerPromise !== undefined){
                    $timeout.cancel(timerPromise);
                }
                console.log($scope.result + ',' + $scope.mulIter);
                $scope.phase = 9;
            }, 1000 * $scope.time);
        };

        $scope.nextMul = function(ans){
            if(ans !== undefined){
                $scope.result += $scope.last = judge($scope.cur, ans);
                if(timerPromise !== undefined){
                    $timeout.cancel(timerPromise);
                }
            }else{
                $scope.last = 0;
            }
            var correctUpdate = checker.update($scope.last);
            changeDuration(correctUpdate);

            $scope.mulIter += 1;
            $scope.mulCur = mulQues.random($scope.firstmin, $scope.firstmax, $scope.secondmin, $scope.secondmax);
            timerPromise = $timeout($scope.nextMul, $scope.duration);
        };

        function changeDuration(correctUpdate){
            if(correctUpdate === 1){
                $scope.duration = parseInt($scope.duration * 0.9);
            }else if(correctUpdate === -1){
                $scope.duration = parseInt($scope.duration * 1.1);
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
        //multiply ends

        //timer
        $scope.timerPhase = function(){
            $scope.phase = 10;

            $timeout(function(){
                $scope.phase = 12;
            }, 10 * 1000);//TODO change as 10 minutes when in production

            $timeout(function(){
                $scope.phase = 13;
            }, 20 * 1000);//TODO change as 20 minutes when in production

            $timeout(function(){
                $scope.phase = 14;
            }, 30 * 1000);//TODO change as 30 minutes when in production
        };
        //timer end

        //form
        $http.get('multiply/forms').success(function(data){
            $scope.form1 = [];
            $scope.form2 = [];
            $scope.form3 = [];
            $scope.form4 = [];
            $scope.form5 = [];

            for(var i = 0, n = data.length; i < n; i += 1){

                if(data[i].type === 'pressure'){
                    $scope.form1.push(data[i]);
                    console.log(data[i].type);
                }else if(data[i].type === 'student'){
                    $scope.form2.push(data[i]);
                    console.log(data[i].type);
                }else if(data[i].type === 'lesshealth'){
                    $scope.form3.push(data[i]);
                    console.log(data[i].type);
                }else if(data[i].type === 'helpother'){
                    $scope.form4.push(data[i]);
                    console.log(data[i].type);
                }else if(data[i].type === 'helpotheract'){
                    $scope.form5.push(data[i]);
                    console.log(data[i].type);
                }
            }

            $scope.formAns1 = new Array($scope.form1.length);
            $scope.formAns12 = new Array($scope.form1.length);
            $scope.formAns2 = new Array($scope.form2.length);
            $scope.formAns3 = new Array($scope.form2.length);
            $scope.formAns4 = new Array($scope.form2.length);
            $scope.formAns5 = new Array($scope.form2.length);
        }).error(function(data, status){
        });
        //form end
    }
]);