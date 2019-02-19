const mongoose = require('mongoose');
const SectionSchema = require('../schemas/Section');

module.exports = Section = mongoose.model('section', SectionSchema);