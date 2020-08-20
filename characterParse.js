const rp = require('request-promise');
const $ = require('cheerio');

const characterParse = (url) => {
    return rp(url)
        .then(function (html) {
            const text = $('#page-title', html).text()
            return text.trim()

        })
        .catch(function (err) {
            console.error(err)
        });
}
module.exports = characterParse
