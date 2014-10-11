'use strict';

angular.module('mean.judge').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('judge', {
      url: '/judge',
      templateUrl: 'judge/views/index.html'
    });
  }
]);
