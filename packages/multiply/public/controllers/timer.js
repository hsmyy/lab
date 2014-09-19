'use strict';

angular.module('mean.multiply').controller('TimerController', ['$scope', '$timeout', '$http', 'Global', 'Multiply',
    function($scope, $timeout, $http, Global, Multiply) {
        $scope.seconds = 10;

        $scope.running =true;

        $scope.tik = function(){
            $scope.seconds -= 1;
            if($scope.seconds < 0) {
                $scope.running = false;
            }else{
                $timeout($scope.tik, 1000);
            }
        };

        $scope.tik();
    }
]);
