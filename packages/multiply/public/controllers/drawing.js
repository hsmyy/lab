/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('DrawingController',
    ['$scope', '$timeout', '$http', 'DataService', 'Config',
        function ($scope, $timeout, $http, DataService, config) {
    $scope.step = 1;

    //TODO change time
    $scope.periodDuration = config.drawing;
    $scope.tuoyeDuration = config.tuoye;

    $scope.text = '开始';
    $scope.wait = false;
    $scope.command = 1;

    $scope.onTimeUp = function() {
        /*global $:false */
        $('#alertPlayer').trigger('play');
        alert('时间到，请点击关闭本对话框并按接下来的提示操作。');
        $scope.$apply(function() {
            $scope.step += 1;
            $scope.text = '开始';
            $scope.wait = false;
            $scope.command = 1;
        });
    };

    $scope.$on('set-command', function(event, command){
        $scope.command = command;
    });

    $scope.onTuoyeTimeUp = function(id){
        $('#alertPlayer').trigger('play');
        alert('时间到，将棉条放回'+id+'号管盖好放入袋中，点击“确定”');
        $scope.$apply(function(){
            $scope.command = 2;
        });
    };

    $scope.startTimer = function(){
        /*global $:false */
        $('#drawTimer')[0].start();
        $scope.text = '请等待';
        $scope.wait = true;
    };

    $scope.saveAndNext = function () {
        $scope.$emit('set-phase', 'survey-student');
    };
}]);
