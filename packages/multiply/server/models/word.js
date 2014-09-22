'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WordSchema = new Schema({
    ques:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    res:{
        type: Boolean,
        required: true
    }
});

exports.Word = mongoose.model('Word', WordSchema);
