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
    survery1 :{
        type : [Number],
        required : true
    },
    survery2 : {
        type : [Number],
        required : true
    },
    surveryStu : {
        type : [Number],
        required : true
    },
    surveryLessHealth : {
        type : [Number],
        required : true
    },
    surveryHelp : {
        type : [Number],
        required : true
    },
    surveryHelpAct : {
        type : [Number],
        required : true
    }
});

exports.Ans = mongoose.model('Ans', AnsSchema);
