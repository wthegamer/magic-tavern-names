const foonNames = require('./characters.json');


export default function randomName() {
    const random = Math.floor(Math.random() * foonNames.length)
    return foonNames[random]
}

