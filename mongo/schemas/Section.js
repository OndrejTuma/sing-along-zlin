const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    belongsTo: {type: Schema.ObjectId, ref: 'repertoire'},
    title: {type: String, required: true},
    songs: [{type: Schema.ObjectId, ref: 'song'}],
    position: {type: Number, default: 0},
});

module.exports = SectionSchema;