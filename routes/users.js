var express = require('express');
var router = express.Router();
var User = require('../models/user');

var renderCreateNewUserPage = function(res, locals) {
  var allLocals = {
    title: 'Add a New Gatekeeper User',
    error: null,
    user: null
  };
  if (locals) {
    for (prop in locals) {
      if (Object.prototype.hasOwnProperty.call(locals, prop)) {
        allLocals[prop] = locals[prop];
      }
    }
  }
  res.render('users/add_new_user', locals);
}

// list all users
router.route('/all')
  .all(function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) {
        return console.error(err);
      }
      if (users.length) {
        res.send(users);
      } else {
        res.send("No users found!");
      }
    });
  });

// verify if a user is registered by sso.
router.get('/:sso(\\d{9})/', function(req, res, next) {
  User.findBySSO(req.params.sso, function(err, user) {
    if (err) {
      console.error(err);
    }
    if (user) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  });
});

// front-end route for creating a new user
router.route('/addNewUser')
  .get(function(req, res, next) {
    renderCreateNewUserPage(res);
  })
  .post(function(req, res, next) {
    var reqBody = req.body;
    User.saveNewUser(reqBody.name, reqBody.sso, reqBody.pin,
      function(err, user) {
        renderCreateNewUserPage(res, { error: err, user: user });
      }
    );
  });

module.exports = router;
