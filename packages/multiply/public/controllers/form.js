/**
 * Created by fengchao on 14-9-14.
 */
'use strict';

angular.module('mean.multiply').controller('FormController', ['$scope', 'Global', 'Multiply', 'vr.directives.slider',
    function($scope, Global, Multiply) {
        $scope.score = 30.0;
    }]);