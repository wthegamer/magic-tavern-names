const foonNames = require('./characters.json');


const randomName = () => {
    const random = Math.floor(Math.random() * foonNames.length)
    return foonNames[random]
}

exports.randomName = randomName()

