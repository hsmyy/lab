/**
 * Created by fify on 9/23/14.
 */
'use strict';

var Multiply = angular.module('mean.multiply');

Multiply.factory('DataService', [function () {
    var data = {};

    function init() {
        data = {};
    }

    function setData(key, value) {
        data[key] = value;
    }

    function getData(key, value) {
        data[key] = value;
    }

    return {
        init: init,
        reset: init,
        setData: setData,
        getData: getData
    };
}]);
