'use strict';

angular.module('mean.judge').controller('JudgeController', ['$scope', 'Global', 'Judge',
  function($scope, Global, Judge) {
        $scope.global = Global;
        $scope.package = {
          name: 'judge'
        };
      console.log($scope.global);
      $scope.phase = 'standby';

      $scope.$on('set-phase', function (event, phase) {
          $scope.phase = phase;
      });

      $scope.startTest = function () {
          $scope.phase = 'word';
      };
  }
]);
