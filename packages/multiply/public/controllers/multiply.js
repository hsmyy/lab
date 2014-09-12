'use strict';

angular.module('mean.multiply').controller('MultiplyController', ['$scope', 'Global', 'Multiply',
    function($scope, Global, Multiply) {
        $scope.global = Global;
        $scope.package = {
            name: 'multiply'
        };

        $scope.phase = 0;

        $scope.quesSet = [{
            'first' : 23,
            'second' : 67,
            'answer' : [100,200,300,400]
        },{
            'first' : 23,
            'second' : 67,
            'answer' : [100,200,300,400]
        }];

        $scope.cur = 0;

        $scope.start = function(){
            $scope.phase = 1;
            $scope.cur = 0;
        };

        $scope.next = function(){
          if($scope.cur < $scope.quesSet.length - 1){
              $scope.cur = $scope.cur + 1;
          }else{
              $scope.phase = 2;
          }
        };
    }
]);
