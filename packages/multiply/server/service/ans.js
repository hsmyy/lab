/**
 * Created by fc on 14-9-24.
 */
'use strict';

var Ans = require('../models/ans').Ans;

exports.save = function(ans, callback){
    Ans.create(ans,function(err){
        callback(err);
    });
};