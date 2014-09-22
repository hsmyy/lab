/**
 * Created by fc on 14-9-11.
 */
'use strict';

angular.module('mean.multiply').controller('WordController', ['$scope', '$timeout', '$http', 'DataService', function ($scope, $timeout, $http, DataService) {
    $scope.step = 1;

    $http.get('multiply/words').success(function (data) {
        $scope.wordSet = data;

        // Only for test.
        $scope.wordSet = [
            {_id: '541fd8fa2d0725ff8438bad5',
                ques: '帮肋',
                res: false,
                type: 'help'}
        ];
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
            $scope.phase = 30;
        }, 5000);//TODO change as 120*1000 when in production
    };

    function timerWord() {
        $scope.wordAttention = 1;
        $scope.wordCur += 1;

        if ($scope.wordCur === $scope.wordSet.length) {
            $scope.step = 3;
            return;
        }

        $timeout(function () {
            $scope.wordAttention = 2;
        }, 750);
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
        $scope.$emit('set-phase', 'survey');
    };
}]);
