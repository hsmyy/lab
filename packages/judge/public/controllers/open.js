/**
 * Created by fc on 14-10-11.
 */

'use strict';

angular.module('mean.judge').controller('JudgeOpenController', ['$scope', 'Global', 'Judge',
    function($scope, Global, Judge) {
        $scope.global = Global;
        $scope.package = {
            name: 'judge'
        };

        $scope.startTest = function(){
            $scope.$emit('set-phase', 'press');
        };
    }
]);
