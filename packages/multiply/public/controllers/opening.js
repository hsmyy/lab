/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController', ['$scope','Global','DataService',
    function ($scope,Global, dataService) {
    $scope.global = Global;
    $scope.step = 1;
    $scope.startTest = function () {
        if($scope.step < 2){
            $scope.step += 1;
        }else{
            $scope.$emit('set-phase','survey0');

        }
    };
}]);
