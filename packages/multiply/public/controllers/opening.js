/**
 * Created by fify on 9/24/14.
 */
'use strict';
angular.module('mean.multiply').controller('OpeningController',
    ['$scope','$timeout', 'Account','DataService', '$http', 'Config',
    function ($scope, $timeout, Account, dataService, $http, config) {
    $scope.global = Account.load();
    $scope.step = 0;
    if($scope.global.user.roles === undefined){
        $scope.textAlert = '请刷新页面后再进行实验，谢谢合作！';
    }
    $scope.skipTime = config.introTime;
    console.log('start intro:' + $scope.skipTime);
    $scope.profile = {
        'year' : '',
        'sex' : 'man',
        'height' : '',
        'weight' : '',
        'origin' : ''
    };
    /*global $:false */
    $('#yujia').trigger('play');
    $timeout(function(){
        console.log('skip over.');
        $scope.step = 1;
//        $scope.apply(function(){
//            $scope.step = 1;
//        });
        $('#yujia').trigger('pause');
    }, 1000 * $scope.skipTime);

    $scope.startTest = function () {
        if($scope.step < 2){
            $scope.step += 1;
        }else{

            if($('.error.ng-hide').length < 13){
                alert('填写有错误，请检查');
                return;
            }
            dataService.setData('profile', angular.copy($scope.profile));
            console.log('[OPEN]Profile Save,Go to Survey0');
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
        console.log('[OPEN]Load Word Data');
    }).error(function (data, status) {
        console.log(status);
    });

    $http.get('multiply/formsall').success(function(data){
        dataService.setData('form-all', data);
        console.log('[OPEN]Load Form Data');
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
