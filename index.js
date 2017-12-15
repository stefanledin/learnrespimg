const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
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