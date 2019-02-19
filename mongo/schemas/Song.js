const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    author: {type: Schema.ObjectId, ref: 'user'},
    title: {type: String, required: true, unique: true},
    text: {type: String, required: true},
    created: {type: Date, default: Date.now},
});

module.exports = SongSchema;