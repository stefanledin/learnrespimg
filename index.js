const path = require('path');
const fs = require('fs');
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Learn Responsive Images'
    })
})

app.get('/level/:level', (req, res) => {
    res.render('level', {
        title: 'Nivå ' + req.params.level,
        number: req.params.level
    });
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

/*app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})*/

app.listen(3000);