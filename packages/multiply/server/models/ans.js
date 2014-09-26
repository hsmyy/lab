/**
 * Created by fc on 14-9-24.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnsSchema = new Schema({
    userid : {
        type : String,
        required : true
    },
    'survey1-answer' :{
        type : [Number],
        required : true
    },
    'survey2-answer' : {
        type : [Number],
        required : true
    },
    'survey-student-answer' : {
        type : [Number],
        required : true
    },
    'survey-lesshealth-answer' : {
        type : [Number],
        required : true
    },
    'survey5-answer' : {
        type : [Number],
        required : true
    },
    'survey6-answer' : {
        type : [Number],
        required : true
    },
    'word-answer' : {
        type : [{
            id : Number,
            result : Number
        }]
    },
    'multiply-answer' : {
        type : {
            'result' : Number,
            'num' : Number
        }
    }
});

exports.Ans = mongoose.model('Ans', AnsSchema);
