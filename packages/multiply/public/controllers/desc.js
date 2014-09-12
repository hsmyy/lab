/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('DescController', ['$scope', 'Global', 'Multiply',
    function($scope, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.quesSet = [{
            'ques' : '大妈摔倒了你扶不扶'
        },{
            'ques' : '大妈摔倒了你扶不扶'
        }];
        $scope.tempAns = '';
        $scope.answer = [];

        $scope.cur = 0;

        $scope.start = function(){
            $scope.phase = 1;
            $scope.cur = 0;
        };

        $scope.next = function(ans){
            $scope.answer.push({
                'id' : $scope.cur,
                'result' : $scope.tempAns
            });
            $scope.tempAns = '';

            if($scope.cur < $scope.quesSet.length - 1){
                $scope.cur = $scope.cur + 1;
            }else{
                $scope.phase = 2;
            }
        };
    }
]);

