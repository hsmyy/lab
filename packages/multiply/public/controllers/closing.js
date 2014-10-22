/**
 * Created by fc on 14-10-22.
 */
'use strict';

angular.module('mean.multiply').controller('ClosingController',
    ['$scope','$timeout','$http','DataService', 'Account',
        function($scope, $timeout, $http, DataService, Account){
            $scope.global = Account.load();

            if($scope.global.user.roles.indexOf('A1') !== -1){
                $scope.step = 1;
                $scope.text = '实验最开始的词语测试中的词是否使你产生了帮助他人的念头或想法?';
            }else if($scope.global.user.roles.indexOf('B1') !== -1){
                $scope.step = 1;
                $scope.text = '完成实验最开始的助人故事写作后，是否使你产生帮助他人的愿望以及由此产生的快乐?';
            }else{
                $scope.step = 2;
                DataService.send($scope.global.user.username);
            }

            $scope.saveAndNext = function(decision){
                $scope.step = 2;
                DataService.setData('decision', decision);
                DataService.send($scope.global.user.username);
            };
        }
    ]);