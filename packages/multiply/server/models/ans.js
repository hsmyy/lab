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
    'survey0-answer':{
        type : [Number],
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
    'survey3-answer' : {
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
    },
    'desc-answer' : {
        type : String,
        required : false
    },
    'profile' : {
        type : {
            'year' : String,
            'sex' : String,
            'height' : String,
            'weight' : String
        }
    },
    'decision' : {
        type : String,
        required : false
    }
});

exports.Ans = mongoose.model('Ans', AnsSchema);
