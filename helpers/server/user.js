const jwt = require('jsonwebtoken');

const secret = require('../consts/secret');
const userConfig = require('../consts/user');

function login(user) {
    return jwt.sign({
        login: user.login,
    }, secret, {
        expiresIn: userConfig.IDLE_TIME,
    });
}

module.exports = {
    login: login,
};