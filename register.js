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

var type = ['a1','a2','b1','b2'];
var roles = [
    ['authenticated','A1'],
    ['authenticated','A2'],
    ['authenticated','B1'],
    ['authenticated','B2']
];

for(var i = 0, n = type.length; i < n; i+=1){
    for(var j = 1; j <= 9; j+=1){
        for(var k = 1; k <= 9; k += 1){
            var id = type[i] + '2' + j + '0' + k;
            console.log(id);
            var user = {
                'name' : id,
                'roles' : roles[i]
            };
            save(user);
        }
    }
}

