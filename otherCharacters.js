const otherUrl = 'http://magictavern.wikidot.com/other-characters';
const rp = require('request-promise');
const $ = require('cheerio');

const otherCharacters = () => {
    return rp(otherUrl)
        .then(function (html) {
            const otherCharacters = []
            const characters = $('h3 > span', html)
            for (let i = 0; i < characters.length; i++) {
                otherCharacters.push(characters[i].children[0].data)
            }
            //console.log(otherCharacters)
            return otherCharacters
        })
        .catch(function (err) {
            console.error(err)
        });
}

module.exports = otherCharacters
