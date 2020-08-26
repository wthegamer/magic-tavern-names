const foonNames = require('./characters.json');


module.exports = function randomName() {
    const random = Math.floor(Math.random() * foonNames.length)
    return foonNames[random]
}

