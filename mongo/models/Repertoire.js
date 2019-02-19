const mongoose = require('mongoose');
const RepertoireSchema = require('../schemas/Repertoire');

module.exports = Repertoire = mongoose.model('repertoire', RepertoireSchema);