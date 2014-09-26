/**
 * Created by fc on 14-9-26.
 */
'use strict';

angular.module('mean.multiply').controller('FaceController', ['$scope', 'Global', 'Multiply',
    function($scope, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.quesSet = [{
            'img' : 'multiply/assets/img/dou.jpg',

            'answer' : ['高兴','不高兴','高兴不','高兴吧']
        },{
            'img' : 'multiply/assets/img/dou.jpg',
            'answer' : ['高兴','不高兴','高兴不','高兴吧']
        }];

        $scope.answer = [];

        $scope.cur = 0;

        $scope.start = function(){
            $scope.phase = 1;
            $scope.cur = 0;
        };

        $scope.next = function(ans){
            $scope.answer.push({
                'id' : $scope.cur,
                'result' : ans
            });
            if($scope.cur < $scope.quesSet.length - 1){
                $scope.cur = $scope.cur + 1;
            }else{
                $scope.phase = 2;
            }
        };
    }
]);