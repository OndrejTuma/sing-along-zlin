const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    belongsTo: {type: Schema.ObjectId, ref: 'repertoire'},
    title: {type: String},
    description: {type: String},
    song: {type: Schema.ObjectId, ref: 'song'},
});

module.exports = Section = mongoose.model('section', SectionSchema);