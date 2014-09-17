/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('DescController', ['$scope', '$http', 'Global', 'Multiply',
    function($scope, $http, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $http.get('multiply/descs').success(function(data){
            $scope.quesSet = data;
        }).error(function(data, status){
            $scope.quesSet = [{
                'ques' : '大妈摔倒了你扶不扶'
            },{
                'ques' : '大妈摔倒了你为啥不扶...'
            }];
        });

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

