/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController',
    ['$scope','Account','DataService', '$http',
    function ($scope,Account, dataService, $http) {
    $scope.global = Account.load();
    $scope.step = 1;
    if($scope.global.user.roles === undefined){
        $scope.textAlert = '请刷新页面后再进行实验，谢谢合作！';
    }
    $scope.profile = {
        'year' : '',
        'sex' : 'man',
        'height' : '',
        'weight' : ''
    };

    $scope.startTest = function () {
        if($scope.step < 2){
            $scope.step += 1;
        }else{
            /*global $:false */
            if($('.error.ng-hide').length < 12){
                alert('填写有错误，请检查');
                return;
            }
            dataService.setData('profile', angular.copy($scope.profile));
            $scope.$emit('set-phase','survey0');
//            $scope.$emit('set-phase','closing');
        }
    };
    var type;
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

    //load word
    $http.get('multiply/words/' + type).success(function (data) {
        dataService.setData('word-ques', shuffle(data));
    }).error(function (data, status) {
        console.log(status);
    });

    $http.get('multiply/formsall').success(function(data){
        dataService.setData('form-all', data);
    }).error(function(data, status){
        console.log(status);
    });

        function shuffle(o){ //v1.0
            for(var j, x, i = o.length; i; ){
                i -= 1;
                j = Math.floor(Math.random() * i);
                x = o[i];
                o[i] = o[j];
                o[j] = x;
            }
            return o;
        }
}]);
