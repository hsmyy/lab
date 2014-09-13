'use strict';

var Multiply = angular.module('mean.multiply');

Multiply.factory('Multiply', [
  function() {
    return {
      name: 'multiply'
    };
  }
]);

Multiply.factory('Timer', [
    function() {
        var start;
        return {
            tik : function(){
                start = new Date();
            },
            tok : function(){
                var end = new Date();
                return end - start;
            }
        };
    }
]);

Multiply.factory('CorrectCheck', [
    function(){
        var cur = 0;
        return {
            update : function(result){
                if(cur === 0){
                    if(result === 0){
                        cur -= 1;
                    }else{
                        cur += 1;
                    }
                }else{
                    if(cur > 0){
                        if(result === 0){
                            cur = -1;
                        }else{
                            cur += 1;
                        }
                    }else{
                        if(result === 0){
                            cur -= -1;
                        }else{
                            cur = 1;
                        }
                    }
                }

                if(cur >= 3){
                    cur = 0;
                    return 1;
                }else if(cur <= -3){
                    cur = 0;
                    return -1;
                }else{
                    return 0;
                }
            }
        };
    }
]);

Multiply.constant('startTestPhase' , 1);
Multiply.constant('finishTestPhase' , 2);
Multiply.constant('startPhase' , 3);
Multiply.constant('finishPhase' , 4);