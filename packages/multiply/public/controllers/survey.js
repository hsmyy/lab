/**
 * Created by fengchao on 14-9-14.
 */
'use strict';

angular.module('mean.multiply').controller('SurveyController',
    ['$scope', '$http', 'Global', 'DataService', function ($scope, $http, Global, DataService) {
    // Survey Name: survey1, survey2, survey-student, survey-lesshealth, survey5.
//    console.log('Survey Name: ' + $scope.surveyName[0]);
    $scope.global = Global;
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
        if($scope.surveyName[1] === 'survey1-answer') {
                DataService.setData('survey1-answer', angular.copy($scope.answers));
                $scope.$emit('set-phase', 'multiply');
        }else if($scope.surveyName[1] === 'survey2-answer'){
                DataService.setData('survey2-answer', angular.copy($scope.answers));
                $scope.$emit('set-phase', 'drawing');
        } else if($scope.surveyName[1] === 'student') {
            DataService.setData('survey-student-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'survey-lesshealth');
        } else if($scope.surveyName[1] === 'lesshealth') {
            DataService.setData('survey-lesshealth-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'survey5');
        } else if($scope.surveyName[1] === 'helpother') {
            DataService.setData('survey5-answer', angular.copy($scope.answers));
            $scope.$emit('set-phase', 'survey6');
        } else if($scope.surveyName[1] === 'helpotheract') {
            DataService.setData('survey6-answer', angular.copy($scope.answers));
//            console.log(DataService.all());
            DataService.send($scope.global.user._id);
            $scope.$emit('set-phase', 'closing');
        }
    };
}]);
