const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {type: String, match: /[a-z\.]/i},
    password: {type: String},
    accessToken: {type: String},
    created: {type: Date, default: Date.now},
});

module.exports = User = mongoose.model('user', UserSchema);