const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learnresponsiveimages');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', () => console.log('open!'));


const User = mongoose.model('User', mongoose.Schema({
    uid: String,
    username: String
}));

/* me.save((err, me) => {
    if (err) {
        console.log(err)
    } 
    console.log(me);
}) */

/* require('dotenv').config();
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
User.sync(); */