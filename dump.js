/**
 * Created by fc on 14-10-8.
 */

'use strict';
var mongoose = require('mongoose'),
    config = require('./config/env/development');
var Schema = mongoose.Schema;
var json2csv = require('json2csv');
var fs = require('fs');

mongoose.connect(config.db);

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

var Ans = mongoose.model('Ans', AnsSchema);

function splitArray(data,convertData, attrKey){
    for(var j = 0,nn = data[attrKey].length; j < nn; j += 1){
        convertData[attrKey + j] = data[attrKey][j] !== null ? data[attrKey][j] : -1;
    }
}

Ans.find('',function(err, dataset){
    //convert data
    var converted = [];
    for(var i = 0,n = dataset.length; i < n; i += 1){
        var convertData = {};
        var data = dataset[i];
        console.log(data);
        convertData.userid = data.userid;
//        for(var j = 0,nn = data['survey1-answer'].length; j < nn; ++j){
//            convertData['survey1-answer' + j] = data['survey1-answer'][j] != null ? data['survey1-answer'][j] : -1;
//        }
        splitArray(data,convertData, 'survey0-answer');
        splitArray(data,convertData, 'survey1-answer');
        splitArray(data,convertData, 'survey2-answer');
        splitArray(data,convertData, 'survey3-answer');
        splitArray(data,convertData, 'survey-student-answer');
        splitArray(data,convertData, 'survey-lesshealth-answer');
        splitArray(data,convertData, 'survey5-answer');
        splitArray(data,convertData, 'survey6-answer');
        converted.push(convertData);
    }
    var keys = [];
    //extract keys
    if(converted.length > 0){
        var target = converted[0];
        for(var key in target){
            if(target.hasOwnProperty(key)){
                keys.push(key);
            }
        }
        //json2csv
        json2csv({
            data : converted,
            fields : keys
        },function(err,csv){
            fs.writeFile('file.csv', csv, function(err){
                if(err) throw err;
                console.log('file saved!');
            });
        });
    }
});
