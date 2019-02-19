const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepertoireSchema = new Schema({
    author: {type: Schema.ObjectId, ref: 'user'},
    active: {type: Boolean},
    title: {type: String, required: true},
    sections: [{type: Schema.ObjectId, ref: 'section'}],
    date: {type: Date, default: Date.now},
});

module.exports = RepertoireSchema;