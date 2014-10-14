/**
 * Created by fc on 14-10-11.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var judgeSchema = new Schema({
    'userid' : {
        type : String,
        required : true
    },
    'collect' : {
        type : [Number],
        required : true
    },
    'time' : {
        type : Number,
        required : true
    },
    'click' : {
        type : [Number],
        required : true
    }
});

exports.Judge = mongoose.model('Judge', judgeSchema);