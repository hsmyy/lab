/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController', ['$scope','Global', function ($scope,Global) {
    $scope.global = Global;
    //console.log($scope.global);

    $scope.startTest = function () {
        if($scope.global.user.roles.indexOf('A1') !== -1 || $scope.global.user.roles.indexOf('A2') !== -1){
            $scope.$emit('set-phase', 'word');
        }else{
            $scope.$emit('set-phase', 'desc');
        }

    };
}]);
