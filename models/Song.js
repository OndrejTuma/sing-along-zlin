const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    author: {type: Schema.ObjectId, ref: 'user'},
    title: {type: String},
    text: {type: String},
    created: {type: Date, default: Date.now},
});

module.exports = Song = mongoose.model('song', SongSchema);