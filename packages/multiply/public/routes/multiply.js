'use strict';

angular.module('mean.multiply').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('乘法实验', {
      url: '/multiply/example',
      templateUrl: 'multiply/views/index.html'
    }).state('描述实验', {
        url: '/description',
        templateUrl: 'multiply/views/desc.html'
    }).state('眼神实验', {
        url: '/face',
        templateUrl: 'multiply/views/face.html'
    }).state('辩词实验', {
        url: '/word',
        templateUrl: 'multiply/views/word.html'
    }).state('问卷调查', {
        url: '/form/:formId',
        templateUrl: 'multiply/views/form.html'
    }).state('计时器',{
        url: '/timer',
        templateUrl: 'multiply/views/timer.html'
    }).state('实验',{
        url: '/test',
        templateUrl: 'multiply/views/test.html',
        controller: 'TestController'
    });
  }
]);