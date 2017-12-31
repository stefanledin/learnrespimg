const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/learnresponsiveimages', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('✅ Database'));

let userSchema = new mongoose.Schema({
    uid: String,
    username: String,
    level: {
        type: Number,
        default: 1
    },
    finishedLevels: Array,
    trophies: Array
}, {
    usePushEach: true
});

userSchema.methods.currentLevel = function () {
    let currentLevel = 1;
    if (this.finishedLevels.length) {
        currentLevel = this.finishedLevels[this.finishedLevels.length - 1];
    }
    return parseFloat(currentLevel);
};

module.exports = mongoose.model('User', userSchema);