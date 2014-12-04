/**
 * Created by fify on 9/23/14.
 */
'use strict';

var Multiply = angular.module('mean.multiply');

Multiply.factory('DataService',[ '$http', function ($http) {
    var data = {};

    function init() {
        data = {};
    }

    function setData(key, value) {
        data[key] = value;
        //TODO send partial data
    }

    function getData(key) {
        return data[key];
    }

    function send(id){
        data.userid = id;
        $http.post('multiply/ans',{data : data}).success(function(){

        }).error(function(err){
            console.log(data);
        });
        return data;
    }

    return {
        init: init,
        reset: init,
        setData: setData,
        getData: getData,
        send: send
    };
}]);
