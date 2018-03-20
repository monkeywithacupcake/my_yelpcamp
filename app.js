const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
// const seedDB = require('./models/seeds');
// seedDB();

mongoose.Promise = global.Promise;

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect('mongodb://localhost:27017/yelpcamp', options, function(err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection with database successful');
    }
});

mongoose.set('debug', true);

const app = express(); // calling express() creates a new express app

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// PASSPORT CONFIG
app.use(
    require('express-session')({
        secret: 'dogfartssmellliketires',
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTING

// a little middle ware to pass user around app
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next()
})

const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/", indexRoutes)
// identify what port to pay attention to
const PORT = process.env.PORT || 5000;
app.listen(PORT);
