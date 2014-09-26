'use strict';

var Word = require('../models/word.js').Word;

exports.get = function(type, callback){
    Word.find({type: type}).exec(function(err, words){
       callback(err, words);
    });
};