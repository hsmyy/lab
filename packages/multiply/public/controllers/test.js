/**
 * Created by fengchao on 14-9-21.
 */
'use strict';

angular.module('mean.multiply').controller('DescController', ['$scope', '$http', '$timeout', 'Global', 'Multiply',
    function($scope, $http, $timeout, Global, Multiply) {
        $scope.global = Global;
        $scope.phase = 0;

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
        $scope.wordAns = [];
        $scope.wordAttention = 0;
        $scope.startWord = function(){
            $scope.phase = 2;
            $scope.wordCur = -1;
            timerWord();
            $timeout(function(){
                $scope.phase = 3;
            },30000);//TODO change as 120*1000 when in production
        };

        function timerWord(){
            $scope.wordAttention = 1;
            $scope.wordCur += 1;
            $timeout(function(){
                $scope.wordAttention = 2;
            }, 100);
        }

        $scope.wordAns = function(ans){
            $scope.wordAns.push({
                'id' : $scope.wordCur,
                'result' : 1 - (ans^$scope.quesSet[$scope.wordCur].res)
            });
            timerWord();
        };
        //word ends

        //multiply
        $scope.time = 120;
        $scope.firstmin = 100;
        $scope.firstmax = 999;
        $scope.secondmin = 10;
        $scope.secondmax = 99;
        $scope.testNumber = 3;

        //TODO
        $scope.startMulTest = function(){};

        $scope.nextMulTest = function(){};

        $scope.startMul = function(){};

        $scope.nextMul = function(){};
        //multiply ends

        //form 1
        $scope.form1 = [
            '123123','123123'
        ];

        $scope.formAns1 = new Array($scope.form1.length);
        $scope.formAns12 = new Array($scope.form1.length);
        //form 1 end

        //form 2
        $scope.form2 = [
            '123123', '123123'
        ];

        $scope.formAns2 = new Array($scope.form2.length);
        //form 2 end

        //form 3
        $scope.form3 = [
            '123123', '123123'
        ];

        $scope.formAns3 = new Array($scope.form2.length);
        //form 3 end

        //form 4
        $scope.form4 = [
            '123123', '123123'
        ];

        $scope.formAns4 = new Array($scope.form2.length);
        //form 4 end

        //form 5
        $scope.form5 = [
            '123123', '123123'
        ];

        $scope.formAns5 = new Array($scope.form2.length);
        //form 5 end
    }
]);