/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('WordController', ['$scope', '$timeout', 'Global', 'Multiply',
    function($scope, $timeout, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.quesSet = [{
            'ques' : '大妈摔倒了你扶不扶',
            'res' : true
        },{
            'ques' : '大妈摔倒了你扶不扶',
            'res' : false
        }];
        $scope.answer = [];

        $scope.cur = 0;

        $scope.attention = 0;

        $scope.start = function(){
            $scope.phase = 1;
            $scope.cur = -1;
            timerNext();
        };

        $scope.next = function(ans){
            $scope.answer.push({
                'id' : $scope.cur,
                'result' : 1 - (ans^$scope.quesSet[$scope.cur].res)
            });
            if($scope.cur < $scope.quesSet.length - 1){
                timerNext();
            }else{
                $scope.phase = 2;
            }
        };

        function timerNext(){
            $scope.attention = 1;
            $scope.cur = $scope.cur + 1;
            $timeout(function(){
                $scope.attention = 2;
            },1500);
        }
    }]);