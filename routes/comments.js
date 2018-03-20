const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

router.post('/', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log('there is an error');
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            console.log('body', req.body.comment);
            Comment.create(req.body.comment, function(err, newc) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    newc.author.id = req.user._id;
                    newc.author.username = req.user.username;
                    newc.save();
                    foundCampground.comments.push(newc);
                    foundCampground.save();
                    res.redirect(`/campgrounds/${foundCampground._id}`); // default redirect is a get request
                }
            });
        }
    });
});

router.get('/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log('there is an error');
            console.log(err);
        } else {
            console.log('trying to show');
            console.log(foundCampground);
            res.render('comments/new', { campground: foundCampground });
        }
    });
});

// make a middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
module.exports = router;
