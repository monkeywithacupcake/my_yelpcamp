const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

router.get('/', function(req, res) {
    // get al the campgrounds from mongo
    // res.render('campgrounds', { campgrounds: campgrounds }); // if we had a static array called campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    });
});

router.get('/new', isLoggedIn, function(req, res) {
    // render a form to make a new one
    res.render('campgrounds/new');
    // get data from form and add to Campgrounds
    // redirect to campgrounds page
});

router.post('/', isLoggedIn, function(req, res) {
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    Campground.create(
        {
            name: req.body.name,
            image: req.body.image,
            author: author,
            description: req.body.description
        },
        function(err, newc) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/campgrounds'); // default redirect is a get request
            }
        }
    );
});

router.get('/:id', function(req, res) {
    // render details about cg
    Campground.findById(req.params.id)
        .populate('comments')
        .exec(function(err, foundCampground) {
            if (err) {
                console.log('there is an error');
                console.log(err);
            } else {
                console.log('trying to show');
                console.log(foundCampground);
                res.render('campgrounds/show', { campground: foundCampground });
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
