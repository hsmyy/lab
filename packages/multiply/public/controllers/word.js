/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('WordController',
    ['$scope', '$timeout', '$http', 'DataService', 'Account', 'Config',
        function ($scope, $timeout, $http, DataService, Account, config) {
    $scope.step = 1;

    $scope.wordTime = config.word;
    $scope.wordPrompt = config.wordPrompt;


    $scope.global = Account.load();

    $scope.wordSet = DataService.getData('word-ques');
    $scope.wordCur = 0;
    $scope.wordAnswer = [];
    $scope.wordAttention = 0;
    $scope.startWord = function () {
        $scope.step = 2;
        $scope.wordCur = -1;
        timerWord();
        $timeout(function () {
            $scope.step = 3;
        }, $scope.wordTime * 1000);//TODO change as 120*1000 when in production
    };



    function timerWord() {
        $scope.wordAttention = 1;
        $scope.wordCur += 1;

        if ($scope.wordCur === $scope.wordSet.length) {
            $scope.wordCur = 0;
        }
//        $scope.wordCur = parseInt(Math.random() * $scope.wordSet.length);

        $timeout(function () {
            $scope.wordAttention = 2;
        }, $scope.wordPrompt);
    }

    $scope.wordAns = function (ans) {
        $scope.wordAnswer.push({
            'id': $scope.wordCur,
            'result': 1 - (ans ^ $scope.wordSet[$scope.wordCur].res)
        });

        timerWord();
    };

    $scope.saveAndNext = function () {
        DataService.setData('word-answer', angular.copy($scope.wordAnswer));
        //$scope.$emit('set-phase', 'survey');
        $scope.$emit('set-phase', 'tuoye2');
    };
}]);
