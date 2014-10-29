/**
 * Created by fc on 14-10-19.
 */
'use strict';

angular.module('mean.multiply').factory('Config', [function(){
    return {
        //test
        word : 30 * 1,//60 * 2
        wordPrompt : 1000,// 10 * 60
        drawing : 20 * 1,//10 * 60
        tuoye : 2 * 1,// 1 * 60
        multiple : 30 * 1,// 10 * 60
        //real
//        word : 60 * 2,
//        desc : 60 * 4,
//        wordPrompt : 1000,
//        drawing : 10 * 60,
//        tuoye : 1 * 60,
//        multiple : 10 * 60,





        mul_first_min : 10,
        mul_first_max : 99,
        mul_second_min : 10,
        mul_second_max : 99,
        mul_test_num : 3

    };
}]);