var express = require('express');
var router = express.Router();
var User = require('../models/user');

// verify if a user is registered by sso.
router.get('/:sso(\\d{9})/', function(req, res, next) {
  var sso = req.params.sso;
  User.findOne({sso: sso}, function(err, user) {
    if (err) {
      console.err(err);
    }
    if (user) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  });
});

router.get('/insertTestUser', function(req, res, next) {
  User.create({
      name: 'Testy McTesterson',
      sso: 123456789
    }, function(err, user) {
      if (err) {
        console.error(err);
      }
      res.send("Testy McTesterson has been entered.");
    });
});

module.exports = router;
