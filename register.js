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

var users = [];
users.push({
        'name' : 'a101',
        'roles' : ['authenticated','A1']
    });
users.push({
        'name' : 'a201',
        'roles' : ['authenticated','A2']
    });
users.push({
        'name' : 'b101',
        'roles' : ['authenticated','B1']
    });
users.push({
        'name' : 'b201',
        'roles' : ['authenticated','B2']
    });

function save(oldUser){
    var user = new User();
    user.name = oldUser.name;
    user.password = oldUser.name;
    user.email = oldUser.name + '@thu.com';
    user.username = oldUser.name;
    user.roles = oldUser.roles;
    user.salt = crypto.randomBytes(16).toString('base64');
    var saltvar = new Buffer(user.salt, 'base64');
    user.hashed_password = crypto.pbkdf2Sync(user.password, saltvar, 10000, 64).toString('base64');


    user.save(function(err){
        console.log(err);
    });
}

for(var i = 0,n = users.length; i < n; i += 1){
    save(users[i]);
}
