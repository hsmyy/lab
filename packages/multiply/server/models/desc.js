'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DescSchema = new Schema({
    ques:{
        type: String,
        require: true
    }
});

exports.Desc = mongoose.model('Desc', DescSchema);
