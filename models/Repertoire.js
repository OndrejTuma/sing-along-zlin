const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepertoireSchema = new Schema({
    author: Schema.ObjectId,
    title: { type: String, match: /[a-z]/i },
    body: String,
    date: { type: Date, default: Date.now },
});

module.exports = Repertoire = mongoose.model('repertoire', RepertoireSchema);