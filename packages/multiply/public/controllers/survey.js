/**
 * Created by fengchao on 14-9-14.
 */
'use strict';

angular.module('mean.multiply').controller('SurveyController',
    ['$scope', '$http', 'Account', 'DataService',
        function ($scope, $http, Account, DataService) {
    // Survey Name: survey1, survey2, survey-student, survey-lesshealth, survey5.
//    console.log('Survey Name: ' + $scope.surveyName[0]);
    $scope.global = Account.load();
    $scope.pageSize = 5;
    $scope.currentPage = 0;
    $scope.currentPageQuestions = [];

    // TODO Load different questions for different survey name.

    $http.get('multiply/forms/' + $scope.surveyName[0]).success(function (data) {
        $scope.questions = data;
        $scope.answers = new Array($scope.questions.length);
        $scope.pageNumber = Math.floor(($scope.questions.length - 1) / $scope.pageSize) + 1;
    }).error(function (data, status) {
    });

    if($scope.surveyName[0] === 'pressure'){
        $scope.title = '下面的描述是否符合你此时此刻的状态';
        $scope.subTitle = '0代表完全不符合  100代表非常符合';
    }else if($scope.surveyName[0] === 'student'){
        $scope.title = '请就下列各题选择一个最符合你近3个月情况的答案，无所谓对错, 请如实回答。';
        $scope.subTitle = '0代表没有经历过或虽有经历并无压力；100代表有很大的压力 向右滑动数字越大代表压力越大';
    }else if($scope.surveyName[0] === 'lesshealth'){
        $scope.title = '请您仔细回忆自己在最近3个月内是否出现下列情况。无所谓对错, 请如实回答。';
        $scope.subTitle = '0代表从来没有这种情况 100代表经常出现这种情况';
    }else if($scope.surveyName[0] === 'helpother'){
        $scope.title = '请对下面一些描述是否符合你自身打分，分值越高代表越符合，没有对错之分请如实回答！';
        $scope.subTitle = '0代表完全不符合 100代表完全符合';
    }

    $scope.prevPage = function() {
        if($scope.currentPage > 0) {
            $scope.currentPage -= 1;
        }
    };

    $scope.nextPage = function() {
        if(($scope.currentPage + 1) * $scope.pageSize < $scope.questions.length) {
            $scope.currentPage += 1;
        }
    };

    $scope.saveAndNext = function() {
        if($scope.surveyName[1] === 'survey0-answer'){
            DataService.setData('survey0-answer', angular.copy($scope.answers));
            if($scope.global.user.roles.indexOf('A1') !== -1 || $scope.global.user.roles.indexOf('A2') !== -1){
                $scope.$emit('set-phase', 'word');
            }else{
                $scope.$emit('set-phase', 'desc');
            }
        }else if($scope.surveyName[1] === 'survey1-answer') {
            DataService.setData('survey1-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'multiply');
        }else if($scope.surveyName[1] === 'survey2-answer'){
            DataService.setData('survey2-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'drawing');
        }else if($scope.surveyName[1] === 'survey3-answer'){
            DataService.setData('survey3-answer', angular.copy($scope.answers));
            //$scope.$emit('set-command',3);
            $scope.$emit('set-step',4);
        }else if($scope.surveyName[1] === 'student') {
            DataService.setData('survey-student-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'survey-lesshealth');
        } else if($scope.surveyName[1] === 'lesshealth') {
            DataService.setData('survey-lesshealth-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'survey5');
        } else if($scope.surveyName[1] === 'helpother') {
            DataService.setData('survey5-answer', angular.copy($scope.answers));

            $scope.$emit('set-phase', 'closing');
        }
    };
}]);
