/**
 * Created by fc on 14-9-24.
 */
'use strict';

var Ans = require('../models/ans').Ans;

exports.save = function(ans, callback){
    console.log(ans.userid);
    Ans.find({},function(err){
        console.log(err);
    });
    Ans.update({userid : ans.userid}, ans, {upsert : true},function(err){
        console.log(err);
        callback(err);
    });
};