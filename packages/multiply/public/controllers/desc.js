/**
 * Created by fc on 14-9-26.
 */
'use strict';

angular.module('mean.multiply').controller('DescController',
    ['$scope', '$http', '$timeout','DataService', 'Account', 'Multiply', 'Config',
    function($scope, $http, $timeout, DataService, Account, Multiply, config) {
        $scope.global = Account.load();
        $scope.package = {
            name: 'multiply'
        };

        $scope.step = 1;

        $scope.time = config.word;

        var qizzes = [{
            text: '请你仔细回忆曾经帮助他人的经历，并详细表述整个过程，写一段200字左右的短文，越详细越好!',
            prompt: '（写下时间、地点、人物、事件和你当时的想法）'
        },{
            text: '请你详细描述所处的这个房间，写一段200字左右的短文，越详细越好! ',
            prompt: '（可以写房间的布局，房间内的陈设等等）'
        }];

        if($scope.global.user.roles.indexOf('B1') !== -1){
            $scope.ques = qizzes[0];
        }else{
            $scope.ques = qizzes[1];
        }

        $scope.ans= {
            'desc' : ''
        };

        $scope.startDesc = function(){
            $scope.step = 2;
            $timeout(function(){
                $scope.step = 3;
            }, $scope.time * 1000);
        };

        $scope.saveAndNext = function () {
            DataService.setData('desc-answer', angular.copy($scope.ans.desc));
            //$scope.$emit('set-phase', 'survey');
            $scope.$emit('set-phase', 'tuoye2');
//            $scope.$emit('set-phase', 'closing');
        };
    }
]);
