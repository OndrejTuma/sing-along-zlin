const mongoose = require('mongoose');
const UserSchema = require('../schemas/User');

module.exports = User = mongoose.model('user', UserSchema);