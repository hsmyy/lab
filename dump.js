/**
 * Created by fc on 14-10-8.
 */

'use strict';
var mongoose = require('mongoose'),
    config = require('./config/env/development');
var Schema = mongoose.Schema;
var json2csv = require('json2csv');
var fs = require('fs');
var Iconv  = require('iconv').Iconv;

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
            'weight' : String,
            'origin' : String
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
        convertData[attrKey + j] = data[attrKey][j] !== null ? data[attrKey][j] / 100 : 0;
    }
}

Ans.find('',function(err, dataset){
    //convert data
    //console.log('dataset length:' + dataset.length);
    var converted = [];
    for(var i = 0,n = dataset.length; i < n; i += 1){
        var convertData = {};
        var data = dataset[i];
        console.log(data);
        convertData.userid = data.userid;
        convertData.decision = data.decision;
        convertData.age = data.profile.year;
        convertData.gender = data.profile.sex;
        convertData.height = data.profile.height;
        convertData.weight = data.profile.weight;
        convertData.origin = data.profile.origin;
        if(data['desc-answer'] !== undefined){
            convertData.desc = data['desc-answer'];
        }else{
            convertData.desc = '';
        }
        convertData.mulAns = data['multiply-answer'].num;
        convertData.mulRight = data['multiply-answer'].result;
        if(data['word-answer'] !== undefined){
            var count = 0;
            for(var j = 0, m = data['word-answer'].length; j < m; j += 1){
                count += data['word-answer'][j].result;
            }
            convertData.wordAns = data['word-answer'].length;
            convertData.wordRight = count;
        }else{
            convertData.wordAns = 0;
            convertData.wordRight = 0;
        }

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
//        splitArray(data,convertData, 'survey6-answer');
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
        var iconv = new Iconv('UTF-8','EUC-CN');
        //json2csv
        json2csv({
            data : converted,
            fields : keys
        },function(err,csv){
            console.log(csv);
            fs.writeFile('file.csv', iconv.convert(csv)/*csv*/, function(err){
                if(err) throw err;
                console.log('file saved!');
            });
        });
    }
});
