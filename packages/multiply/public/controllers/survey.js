/**
 * Created by fengchao on 14-9-14.
 */
'use strict';

angular.module('mean.multiply').controller('SurveyController', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
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
        // TODO Go to next phase.
        DataService.setData('survey-answer', angular.copy($scope.formAns1));
        $scope.$emit('set-phase', 'xxx');
    };
}]);
