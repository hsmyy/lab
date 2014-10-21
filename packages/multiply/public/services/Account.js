/**
 * Created by fc on 14-10-21.
 */
'use strict';

//Global service for global variables
angular.module('mean.multiply').factory('Account', [

    function() {
        return {
            load : function(){
                var data = {
                    user: window.user,
                    authenticated: false,
                    isAdmin: false
                };
                if (window.user && window.user.roles) {
                    data.authenticated = window.user.roles.length;
                    data.isAdmin = window.user.roles.indexOf('admin') !== -1;
                }
                return data;
            }
        };
    }
]);
