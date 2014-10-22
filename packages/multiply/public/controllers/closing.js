/**
 * Created by fc on 14-10-22.
 */
'use strict';

angular.module('mean.multiply').controller('ClosingController',
    ['$scope','$timeout','$http','DataService', 'Account',
        function($scope, $timeout, $http, DataService, Account){
            $scope.global = Account.load();

            if($scope.global.user.roles.indexOf('A1') !== -1 ||
                $scope.global.user.roles.indexOf('B1') !== -1){
                $scope.step = 1;
            }else{
                $scope.step = 2;
                DataService.send($scope.global.user.username);
            }

            $scope.saveAndNext = function(decision){
                $scope.step = 2;
                DataService.setData('decision', decision);
                DataService.send($scope.global.user.username);
            }
        }
    ]);