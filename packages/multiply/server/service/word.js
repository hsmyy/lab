'use strict';

var Word = require('../models/word.js').Word;

exports.get = function(callback){
    Word.find().exec(function(err, words){
       callback(err, words);
    });
};