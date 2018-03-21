const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');


router.get('/', function(req, res) {
    // get al the campgrounds from mongo
    // res.render('campgrounds', { campgrounds: campgrounds }); // if we had a static array called campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            req.flash('error', err.message)
            res.redirect('back');
        } else {
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res) {
    // render a form to make a new one
    res.render('campgrounds/new');
    // get data from form and add to Campgrounds
    // redirect to campgrounds page
});

router.post('/', middleware.isLoggedIn, function(req, res) {
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
                req.flash('error', err.message)
                res.redirect('back');
            } else {
                req.flash('success', 'Thanks for adding a campground. YelpCamp is a little better now!')
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
                req.flash('error', err.message)
                res.redirect('back');
            } else {
                console.log('trying to show');
                console.log(foundCampground);
                res.render('campgrounds/show', { campground: foundCampground });
            }
        });
});

// Edit campgrounds
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    //render edit template with that campground
  res.render("campgrounds/edit", {campground: req.campground});
    // Campground.findById(req.params.id).exec(function(err, foundCampground) {
    //     res.render('campgrounds/edit', { campground: foundCampground });
    // });
});

// Update campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
        err,
        updatedCampground
    ) {
        if (err) {
            req.flash('error', err.message)
            res.redirect('back');
        } else {
            res.redirect(`/campgrounds/${updatedCampground._id}`); // default redirect is a get request
        }
    });
});
// Destroy campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds'); // default redirect is a get request
        }
    });
});



module.exports = router;
