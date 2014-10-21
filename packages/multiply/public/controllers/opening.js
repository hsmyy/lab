/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController', ['$scope','Global','DataService',
    function ($scope,Global, dataService) {
    $scope.global = Global;
    $scope.step = 1;
    console.log($scope.global);
    if($scope.global.user.roles == undefined){
        $scope.textAlert = '请刷新页面后再进行实验，谢谢合作！';
    }
    $scope.profile = {
        'year' : '',
        'sex' : 'man',
        'height' : '',
        'weight' : ''
    };

    $scope.startTest = function () {
        if($scope.step < 2){
            $scope.step += 1;
        }else{
            dataService.setData('profile', angular.copy($scope.profile));
            $scope.$emit('set-phase','survey0');
        }
    };
}]);
