/**
 * Created by fc on 14-10-14.
 */
'use strict';

var Judge = require('../models/judge').Judge;

exports.save = function(judge, callback){
    Judge.update({userid : judge.userid}, judge, {upsert : true}, function(err){
        callback(err);
    });
};