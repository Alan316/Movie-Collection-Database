var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user');

// GET route for reading data
router.get("/", (req, res) => {
  res.render("index");
});

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
      };

    //If registration is correct, and account is created, temporarily return user data
    //Eventually this will render a user profile based on a template
    User.create(userData, function (error, user) {
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/">Logout</a>');
        //return res.redirect('/profile/' + req.body.username); 
      }
    });

  } else if (req.body.loguser && req.body.logpassword) {
    User.authenticate(req.body.loguser, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err2 = new Error('Wrong username or password.');
        err2.status = 401;
        return next(err2);     
      } else {
        req.session.userId = user._id;
        return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/">Logout</a>');
        //return res.redirect('/profile');
      }
    });
  } else {
      var err3 = new Error('All fields required.');
      err3.status = 400;
      return next(err3);
  }
});

// GET route after registering
/*router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //send registrant to their user page
          //return res.redirect('/profile/' + req.body.username); 
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/">Logout</a>');
        }
      }
    });
});*/

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;