const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learnresponsiveimages', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once('open', () => console.log('✅ Database'));

let userSchema = new mongoose.Schema({
    uid: String,
    username: String,
    level: {
        type: Number,
        default: 1
    },
    points: {
        type: Number,
        default: 0
    },
    finishedLevels: Array,
    trophies: Array
});

userSchema.methods.currentLevel = function () {
    let currentLevel = 0;
    if (this.finishedLevels.length) {
        currentLevel = this.finishedLevels[this.finishedLevels.length - 1];
    }
    return parseFloat(currentLevel);
};

module.exports = mongoose.model('User', userSchema);