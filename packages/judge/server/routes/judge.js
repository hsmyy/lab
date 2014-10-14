'use strict';

var JudgeService = require('../service/judge');

// The Package is past automatically as first parameter
module.exports = function(Judge, app, auth, database) {

  app.get('/judge/example/anyone', function(req, res, next) {
    res.send('Any(one can access this');
  });

  app.get('/judge/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/judge/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/judge/example/render', function(req, res, next) {
    Judge.render('index', {
      package: 'judge'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

    app.post('/judge/judge', function(req,res,next){
        JudgeService.save(req.body, function(err){
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
