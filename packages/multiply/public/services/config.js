/**
 * Created by fc on 14-10-19.
 */
'use strict';

angular.module('mean.multiply').factory('Config', [function(){
    return {
        word : 10 * 1,
        wordPromp : 750,
        drawing : 10 * 1,
        tuoye : 3 * 1,

        multiple : 10 * 1,
        mul_first_min : 10,
        mul_first_max : 99,
        mul_second_min : 10,
        mul_second_max : 99,
        mul_test_num : 3

    };
}]);