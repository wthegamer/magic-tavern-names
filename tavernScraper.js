const characterParse = require('./characterParse');
const otherCharacters = require('./otherCharacters.js')
const rp = require('request-promise');
const fs = require('file-system');
const $ = require('cheerio');
const url = 'http://magictavern.wikidot.com/guests-alphabetical';

const otherGuests = []

rp(url)
    .then(function (html) {
        //console.log(html)
        const linkLength = $('li > a', html).length
        // console.log($('li > a', html).length)
        // console.log($('li > a', html))
        const guest_urls = []
        for (let i = 0; i < linkLength; i++) {
            //console.log($('li > a', html)[i].attribs)
            guest_urls.push($('li > a', html)[i].attribs.href)
        }
        const blacklist = ['/start',
            '/system:list-all-pages',
            '/featured:_start',
            '/glossary',
            '/random',
            '/about',
            '/system:recent-changes',
            '/contact',
            '/donate',
            '/legal:_start',
            '/help',
            '/_admin',
            '/nav:side/edit/true',
            '/nav:top/edit/true',
            '/snippet:_start',
            'https://twitter.com/agoldmund',
            'javascript:;',
            '/interlude-chicago',
            '/interlude-cowboy-world']
        const filteredUrls = guest_urls.filter((item) => {

            //console.log('includes', item, !blacklist.includes(item))
            return !blacklist.includes(item)
        })

        //console.log(filtered_urls)
        return Promise.all(
            filteredUrls.map(function (url) {
                //console.log(characterParse('http://magictavern.wikidot.com/' + url))
                return characterParse('http://magictavern.wikidot.com/' + url);
            })
        );
    })
    .then(async function (character) {
        const other = await otherCharacters()
        console.log('character', character)
        console.log('other', other)
        const otherJson = JSON.stringify(other)
        console.log('otherJson', otherJson)

        const json = JSON.stringify(character)
        console.log('json', json)
        const total = JSON.stringify(other.concat(character))
        console.log('total', total)
        fs.writeFile('characters.json', total, function (err) {
            if (err) throw err;
            console.log('complete');
        })
    })
    .catch(function (err) {
        console.error(err)
    })