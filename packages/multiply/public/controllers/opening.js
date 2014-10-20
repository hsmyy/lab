/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController', ['$scope','Global','DataService',
    function ($scope,Global, dataService) {
    $scope.global = Global;
    //console.log($scope.global);

    $scope.startTest = function () {
        //$scope.$emit('set-phase', 'tuoye1');
        //$scope.$emit('set-phase', 'drawing');
        //console.log($scope.global);
        if($scope.global.user.roles.indexOf('A1') !== -1 || $scope.global.user.roles.indexOf('A2') !== -1){
            $scope.$emit('set-phase', 'word');
        }else{
            $scope.$emit('set-phase', 'desc');
        }

    };
}]);
