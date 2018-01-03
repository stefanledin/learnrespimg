const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();
require('./config/database');
const User = mongoose.model('User');

/**
 * Configuration
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'learn responsive images',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: process.env.callbackURL
    }, async function (token, tokenSecret, profile, done) {
        var user;
        user = await User.findOne({uid: profile.id});
        if (!user) {
            user = await (new User({
                uid: profile.id,
                username: profile.username
            })).save();
        }
        return done(null, user);
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

/**
 * Routes
 */
app.get('/', function (req, res) {
    res.render('intro', {
        title: 'Intro – Learn Responsive Images',
        user: req.user,
        currentLevel: req.user ? req.user.currentLevel() : 1
    })
});

app.get('/intro', function (req, res) {
    res.render('intro', {
        title: 'Intro – Learn Responsive Images',
        user: req.user,
        currentLevel: req.user ? req.user.currentLevel() : 1
    })
});

app.get('/level/:level', async (req, res) => {
    const level = req.params.level;
    if (req.user) {
        const user = await User.findById(req.user.id);
        const nextLevel = user.currentLevel();
        if (nextLevel.toString() !== level) {
            //res.redirect('/level/'+nextLevel);
        }
    }
    const levelData = fs.readFileSync(`./resources/leveldata/level-${level}.json`, 'utf-8');
    res.render('level', {
        title: `Level ${level} | Learn Responsive Images`,
        level,
        levelData: JSON.parse(levelData),
        user: req.user
    });
});

app.get('/happy-birthday', (req, res) => {
    res.render('happy-birthday', {
        title: 'Happy Birthday | Learn Responsive Images',
        user: req.user
    });
})

app.post('/finished-level', async (req, res) => {
    if (!req.user) return;
    const user = await User.findById(req.user.id);
    if (!user.finishedLevels.includes(req.body.level)) {
        user.finishedLevels.push(req.body.level);
    }
    if (req.body.trophy) {
        user.trophies.push(req.body.trophy);
    }
    user.save();
    res.send(user);
})

app.get('/login', (req, res) => res.send('Unable to login'));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000);