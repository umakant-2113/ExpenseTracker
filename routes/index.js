var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */

router.get('/', function (req, res, next) {
  let err = req.flash('error')[0];
  res.render('index', { title: 'Express', err });
});

router.get('/failure', (req, res) => {
  res.redirect('/');
});

router.get('/success', (req, res) => {
  console.log('success data');
  res.redirect('/users/onboarding');
});

//google login

router.get(
  '/auth/google',
  passport.authenticate('google', {
    
    scope: ['profile' , 'email'],

  })
);

router.get(
  '/google/callback/auth',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/success',
  })
);

//github login
router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
    successRedirect: '/success',
  })
);

module.exports = router;
