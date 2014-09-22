/**
 * Created by fc on 14-9-22.
 */
'use strict';

var Form = require('../models/form').Form;

exports.get = function(callback){
    Form.find().exec(function(err, forms){
        callback(err, forms);
    });
};