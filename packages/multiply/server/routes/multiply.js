'use strict';

var WordService = require('../service/word');
var DescService = require('../service/desc');
var FormService = require('../service/form');
var AnsService = require('../service/ans');

// The Package is past automatically as first parameter
module.exports = function(Multiply, app, auth, database) {

  app.get('/multiply/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/multiply/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/multiply/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/multiply/example/render', function(req, res, next) {
    Multiply.render('index', {
      package: 'multiply'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.get('/multiply/words/:type', function(req, res, next){
    WordService.get(req.param('type'), function(err, words){
        if(err){
            res.render('error',{
                status : 500
            });
        }else{
            res.jsonp(words);
        }
    });
  });

  app.get('/multiply/descs', function(req, res, next){
      DescService.get(function(err, descs){
          if(err){
              res.render('error',{
                  status : 500
              });
          }else{
              res.jsonp(descs);
          }
      });
  });

  app.get('/multiply/forms/:formType', function(req, res, next){
      FormService.get(req.param('formType'),function(err, forms){
          if(err){
              res.render('error',{
                  status : 500
              });
          }else{
              res.jsonp(forms);
          }
      });
  });

    app.get('/multiply/formsall', function(req, res, next){
        FormService.getAll(req.param('formType'),function(err, forms){
            if(err){
                res.render('error',{
                    status : 500
                });
            }else{
                res.jsonp(forms);
            }
        });
    });

  app.post('/multiply/ans', function(req, res, next){
      AnsService.save(req.body, function(err){
          if(err){
              res.render('error',{
                  status : 500
              });
          }else{
              res.jsonp({'res':'ok'});
          }
      });
  });
};
