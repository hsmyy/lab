/**
 * Created by fengchao on 14-9-14.
 */
'use strict';

angular.module('mean.multiply').controller('SurveyController', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    // Survey Name: survey1, survey2, survey-student, survey-lesshealth, survey5.
    console.log('Survey Name: ' + $scope.surveyName);

    // TODO Load different questions for different survey name.

    $http.get('multiply/forms').success(function (data) {
        $scope.form1 = [];
        $scope.form2 = [];
        $scope.form3 = [];
        $scope.form4 = [];
        $scope.form5 = [];

        for (var i = 0, n = data.length; i < n; i += 1) {

            if (data[i].type === 'pressure') {
                $scope.form1.push(data[i]);
                console.log(data[i].type);
            } else if (data[i].type === 'student') {
                $scope.form2.push(data[i]);
                console.log(data[i].type);
            } else if (data[i].type === 'lesshealth') {
                $scope.form3.push(data[i]);
                console.log(data[i].type);
            } else if (data[i].type === 'helpother') {
                $scope.form4.push(data[i]);
                console.log(data[i].type);
            } else if (data[i].type === 'helpotheract') {
                $scope.form5.push(data[i]);
                console.log(data[i].type);
            }
        }

        $scope.formAns1 = new Array($scope.form1.length);
        $scope.formAns12 = new Array($scope.form1.length);
        $scope.formAns2 = new Array($scope.form2.length);
        $scope.formAns3 = new Array($scope.form2.length);
        $scope.formAns4 = new Array($scope.form2.length);
        $scope.formAns5 = new Array($scope.form2.length);
    }).error(function (data, status) {
    });

    $scope.saveAndNext = function() {
        if($scope.surveyName === 'survey1') {
            DataService.setData('survey1-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'multiply');
        } else if($scope.surveyName === 'survey2') {
            DataService.setData('survey2-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'drawing');
        } else if($scope.surveyName === 'survey-student') {
            DataService.setData('survey-student-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'survey-lesshealth');
        } else if($scope.surveyName === 'survey-lesshealth') {
            DataService.setData('survey-lesshealth-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'survey5');
        } else if($scope.surveyName === 'survey5') {
            DataService.setData('survey5-answer', angular.copy($scope.formAns1));
            $scope.$emit('set-phase', 'survey6');
        }
    };
}]);
