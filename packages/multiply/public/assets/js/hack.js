/**
 * Created by fc on 14-12-4.
 */
'use strict';

/*jshint unused:false*/
var goto = function(place){
    var controller = angular.element('[ng-controller=TestController]');
    if(controller !== undefined){
        controller.scope().$apply(function(){
            var phase = '';
            if(place === 'word'){
                phase = 'word';
            }else if(place === 'desc'){
                phase = 'desc';
            }else if(place === 'multiply'){
                phase = 'multiply';
            }else if(place === 'draw'){
                phase = 'drawing';
            }else if(place === 'survey'){
                phase = 'survey-student';
            }
            controller.scope().phase = phase;
        });
    }
};
