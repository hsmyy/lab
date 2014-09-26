/**
 * Created by fc on 14-9-26.
 */
'use strict';

angular.module('mean.multiply').controller('DescController', ['$scope', '$http', '$timeout','DataService', 'Global', 'Multiply',
    function($scope, $http, $timeout, DataService, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.step = 1;

        var qizzes = [{
            text: '请你仔细曾经回忆帮助他人的经历，并详细表述整个过程，写一段200字左右的短文，越详细越好!',
            prompt: '（写下时间、地点、人物事件和你当时的想法）'
        },{
            text: '请你详细描述所处的这个房间，写一段200字左右的短文，越详细越好! ',
            prompt: '（可以写房间的布局，房间内的陈设等等）'
        }];

        if(Global.user.roles.indexOf('B1') !== -1){
            $scope.ques = qizzes[0];
        }else{
            $scope.ques = qizzes[1];
        }

        $scope.ans = '';

        $scope.startDesc = function(){
            $scope.step = 2;
            $timeout(function(){
                $scope.step = 3;
            }, 5000);
        };

        $scope.saveAndNext = function () {
            DataService.setData('desc-answer', $scope.ans);
            $scope.$emit('set-phase', 'survey');
        };
    }
]);
