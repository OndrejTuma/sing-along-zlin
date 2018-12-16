const jwt = require('jsonwebtoken');

const secret = require('../consts/secret');

function login(user) {
    return jwt.sign({
        login: user.login,
    }, secret, {
        expiresIn: 300, // s
    });
}

module.exports = {
    login: login,
};