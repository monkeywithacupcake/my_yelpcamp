const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash('error', err.message)
            res.redirect('back');
        } else {
            console.log('body', req.body.comment);
            Comment.create(req.body.comment, function(err, newc) {
                if (err) {
                    req.flash('error', err.message)
                    res.redirect('back');
                } else {
                    // add username and id to comment
                    newc.author.id = req.user._id;
                    newc.author.username = req.user.username;
                    newc.save();
                    foundCampground.comments.push(newc);
                    foundCampground.save();
                    req.flash('success', 'Thanks for adding a comment')
                    res.redirect(`/campgrounds/${foundCampground._id}`); // default redirect is a get request
                }
            });
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash('error', err.message)
            res.redirect('back');
        } else {
            console.log('trying to show');
            console.log(foundCampground);
            res.render('comments/new', { campground: foundCampground });
        }
    });
});

// Edit comment
router.get('/:comment_id/edit', middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res) {
    // ian code
    res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
    // Comment.findById(req.params.comment_id).exec(function(err, foundComment) {
    //     res.render('comments/edit', {
    //         campground_id: req.params.id,
    //         comment: foundComment
    //     });
    // });
});

// Update comment
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.findByIdAndUpdate(
                req.params.comment_id,
                req.body.comment,
                function(err, updatedComment) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success', 'Comment updated')
                        res.redirect(`/campgrounds/${foundCampground._id}`); // default redirect is a get request
                    }
                }
            );
        }
    });
});

// Destroy comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Comment deleted')
            res.redirect(`/campgrounds${req.params.id}`); // default redirect is a get request
        }
    });
});


module.exports = router;
