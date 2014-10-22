/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController',
    ['$scope','Account','DataService',
    function ($scope,Account, dataService) {
    $scope.global = Account.load();
    $scope.step = 1;
    if($scope.global.user.roles === undefined){
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
//            $scope.$emit('set-phase','closing');
        }
    };
}]);
