const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('learnresponsiveimages_dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }
})
sequelize.authenticate();

const User = sequelize.define('user', {
    uid: Sequelize.INTEGER,
    username: Sequelize.STRING
});
User.sync();


const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;

app.use(session({
    secret: 'learn responsive images',
    resave: false,
    saveUninitialized: true
}));

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    }, function (token, tokenSecret, profile, done) {
        User.findOrCreate({
            where: {
                uid: profile.id
            }
        }).spread((user, created) => {
            console.log('spread');
            return done(null, user);
        })
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.get('/login', (req, res) => res.send('fail'));

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    console.log(req.isAuthenticated());
    const levelData = fs.readFileSync('./resources/leveldata/landingpage.json');
    res.render('landing-page', {
        title: 'Learn Responsive Images',
        levelData: JSON.parse(levelData)
    })
})

app.get('/intro', function (req, res) {
    res.render('intro', {
        title: 'Intro – Learn Responsive Images'
    })
});

app.get('/level/:level', (req, res) => {
    const level = req.params.level;
    const levelData = fs.readFileSync(`./resources/leveldata/level-${level}.json`, 'utf-8');
    res.render('level', {
        title: `Level ${level} | Learn Responsive Images`,
        level,
        levelData: JSON.parse(levelData)
    });
});

app.get('/happy-birthday', (req, res) => {
    res.render('happy-birthday', {
        title: 'Happy Birthday | Learn Responsive Images'
    });
})

app.get('/source/:level', (req,res) => res.render(`source-${req.params.level}`));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

/*app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})*/

app.listen(3000);