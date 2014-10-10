/**
 * Created by fc on 14-10-10.
 */
'use strict';

var mongoose = require('mongoose'),
    config = require('./config/env/development');
var crypto = require('crypto');

require('./packages/users/server/models/user');

mongoose.connect(config.db);

var User = mongoose.model('User');

var user = new User();
user.name = 'test1';
user.password = 'test1';
user.email = 'test1@thu.com';
user.username = 'test1';
user.roles = ['authenticated','A1'];
user.salt = crypto.randomBytes(16).toString('base64');
var saltvar = new Buffer(user.salt, 'base64');
user.hashed_password = crypto.pbkdf2Sync(user.password, saltvar, 10000, 64).toString('base64');


user.save(function(err){
    console.log(err);
});