const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', function(req, res) {
    res.render('landing');
});

// auth routes
// show register form
router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    const newuser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.register(newuser, req.body.password, function(err, newuser) {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/campgrounds'); // default redirect is a get request
            });
        }
    });
});

// show login form
router.get('/login', function(req, res) {
    res.render('login');
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log('login post');
    }
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});


module.exports = router;
