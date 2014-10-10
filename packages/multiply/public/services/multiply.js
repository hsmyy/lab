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
                    if(result !== 1){
                        cur = -1;
                    }else{
                        cur = 1;
                    }
                }else if(cur > 0){
                    if(result !== 1){
                        cur = -1;
                    }else{
                        cur += 1;
                    }
                }else{
                    if(result !== 1){
                        cur -= 1;
                    }else{
                        cur = 1;
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

Multiply.factory('MulQuestions', [function(){
    return {
        random : function(firstmin, firstmax, secondmin, secondmax){
            var three = parseInt(Math.random() * (firstmax - firstmin) + firstmin);
            var two = parseInt(Math.random() * (secondmax - secondmin) + secondmin);
            var answer = three * two;
            var right10digit = parseInt(answer / 10) % 10;
            var right100digit = parseInt(answer / 100) % 10;
            var wrong10digit = (right10digit + parseInt(1 + Math.random() * 8)) % 10;
            var wrong100digit = (right100digit + parseInt(1 + Math.random() * 8)) % 10;
            var lastDigit = answer % 10;
            var prefix = parseInt(answer / 1000) * 1000;
            var originAnswer = [answer];
            originAnswer.push(prefix + right100digit * 100 + wrong10digit * 10 + lastDigit);
            originAnswer.push(prefix + wrong100digit * 100 + right10digit * 10 + lastDigit);
            originAnswer.push(prefix + wrong100digit * 100 + wrong10digit * 10 + lastDigit);

            var index = parseInt(Math.random() * 4);
            //swap
            var temp = originAnswer[0];
            originAnswer[0] = originAnswer[index];
            originAnswer[index] = temp;

            return {
                'first' : three,
                'second' : two,
                'answer' : originAnswer
            };
        }
    };
}]);

Multiply.constant('startTestPhase' , 1);
Multiply.constant('finishTestPhase' , 2);
Multiply.constant('startPhase' , 3);
Multiply.constant('finishPhase' , 4);