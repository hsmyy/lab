/**
 * Created by fc on 14-9-22.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
    ques:{
        type : String,
        require: true
    },
    type:{
        type : String,
        require: true
    }
});

exports.Form = mongoose.model('Form', FormSchema);
