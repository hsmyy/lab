'use strict';

var Desc = require('../models/desc').Desc;

exports.get = function(callback){
    Desc.find().exec(function(err,descs){
        callback(err, descs);
    });
};