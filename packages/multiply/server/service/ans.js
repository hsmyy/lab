/**
 * Created by fc on 14-9-24.
 */
'use strict';

var Ans = require('../models/ans').Ans;

exports.save = function(ans, callback){
//    Ans.find({},function(err){
//        console.log(err);
//    });
    Ans.update({userid : ans.userid}, ans, {upsert : true},function(err){
        callback(err);
    });
};