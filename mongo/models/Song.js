const mongoose = require('mongoose');
const SongSchema = require('../schemas/Song');

module.exports = Song = mongoose.model('song', SongSchema);