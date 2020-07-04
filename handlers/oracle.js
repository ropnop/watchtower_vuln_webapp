const _ = require('lodash');
const matcher = require('matcher');

const {heroes, villains} = require('../data/heroes_and_villains');

function villainSearch (req, res) {
    const searchTerm = req.query.search
    let data = {};
    if (searchTerm) {
        results = matcher(villains, [searchTerm])
        data = {
            results: results,
            searchTerm: searchTerm
        }
    }
    res.render('oracle_villains', data);
}

function heroSearch (req, res) {
    res.render('oracle_heroes', {results: heroes})
}

function heroAPI (req, res) {
    res.json(heroes)
}

module.exports = {villainSearch, heroSearch, heroAPI}
