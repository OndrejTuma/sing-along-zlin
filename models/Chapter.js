const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
    author: Schema.ObjectId,
    title: { type: String, match: /[a-z]/i },
    body: String,
    date: { type: Date, default: Date.now },
});

module.exports = Chapter = mongoose.model('chapter', ChapterSchema);