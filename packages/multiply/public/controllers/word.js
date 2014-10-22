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

    var type;
    $scope.global = Account.load();

    $scope.isHelp = function(){
        if($scope.global.user.roles.indexOf('A1') !== -1){
            return true;
        }else{
            return false;
        }
    };
    if($scope.isHelp()){
        type = 'help';
    }else{
        type = 'normal';
    }

    $http.get('multiply/words/' + type).success(function (data) {
        $scope.wordSet = data;
    }).error(function (data, status) {
        $scope.wordSet = [
            {
                'ques': '大妈摔倒了你扶不扶',
                'res': true
            },
            {
                'ques': '大妈摔倒了你扶不扶',
                'res': false
            }
        ];
    });

    $scope.wordCur = -1;
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
//            $scope.step = 3;
            $scope.wordCur = 0;
            return;
        }

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
