/**
 * Created by fengchao on 14-10-18.
 */
'use strict';

angular.module('mean.multiply').controller('TuoyeController',
    ['$scope','$timeout','$http','Account', 'Config',
        function($scope, $timeout, $http, Account, config){
        $scope.global = Account.load();
        $scope.step = 1;

        $scope.text = '开始';
        $scope.wait = false;
        $scope.duration = config.tuoye;

        $scope.startTimer = function(){
            $scope.text = '请等待';
            $scope.wait = true;
            /*global $:false */
            $('#countdown')[0].start();
        };

        $scope.onTimeUp = function(){

            $('#alertPlayer').trigger('play');
            alert('时间到，将棉条放回' + $scope.id + '号管盖好放入袋中，点击“确定”');

            $scope.$apply(function(){
                var id = parseInt($scope.id);
                if(id === 1){
                    if($scope.global.user.roles.indexOf('A1') !== -1 || $scope.global.user.roles.indexOf('A2') !== -1){
                        $scope.$emit('set-phase', 'word');
                    }else{
                        $scope.$emit('set-phase', 'desc');
                    }
                } else if(id === 2){
                    $scope.$emit('set-phase', 'survey');
                } else if(id === 3){
                    $scope.$emit('set-phase', 'survey2');
                }
                //$scope.$emit('set-phase', 'word');
                //$scope.wait = false;
            });
        };
    }
]);