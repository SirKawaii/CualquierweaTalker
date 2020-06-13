// utils.js
const fs = require('fs');

function GetToken() {
    let secretFile = require('../utils/secret.json');
    return secretFile.discordApi;
}

module.exports = {
    GetToken
}
