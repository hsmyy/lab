/**
 * Created by fc on 14-10-11.
 */
'use strict';

angular.module('mean.judge').controller('JudgePressController', ['$scope', '$timeout', 'Global', 'Judge',
    function($scope, $timeout, Global, Judge) {
        $scope.global = Global;
        $scope.package = {
            name: 'judge'
        };

        $scope.finishTest = function(){
            if (promise !== undefined) {
                $timeout.cancel(promise);
            }
            console.log($scope.collect);
            $scope.$emit('set-phase', 'closing');
        };

        $scope.collect = [];
        var promise;
        var recordInterval = 20 * 1000;
        promise = $timeout(function record(){
            do {
                var score = prompt('Please describe your feeling as score(from 1-7):');
                var number = parseInt(score);
                if(!isNaN(number) && score <= 7 && score >=1){
                    $scope.collect.push(number);
                    break;
                }
            }while(true);
            $timeout(record, recordInterval);
        }, recordInterval);

        $timeout(function next(){
            $scope.finishTest();
        },10 * 60 * 1000);

        $scope.moreThan3 = false;
        $scope.clickNum = 0;
        $scope.firstClick = function(idx){
            $scope.sounds[idx].status = 2;
            $scope.clickNum += 1;
            if($scope.clickNum >= 3){
                $scope.moreThan3 = true;
            }
            /*global $:false */
            $('#alertPlayer').attr('src',$scope.sounds[idx].sound).trigger('play');
        };

        $scope.sounds = [{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'neil',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/alert.mp3'
        },{
            'text': 'machine',
            'status' : 1,
            'sound' : '/multiply/assets/mp3/beng.mp3'
        },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            },{
                'text': 'machine',
                'status' : 1,
                'sound' : '/multiply/assets/mp3/beng.mp3'
            }
        ];
    }
]);