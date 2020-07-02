require('rootpath')();
const _ = require('lodash');

const {villains} = require('data/heroes_and_villains');
const { search } = require('../routes');

function oracleSearch (req, res) {
    const searchTerm = req.query.search
    let data = {};
    if (searchTerm) {
        // results = _.reduce(villains, (result, value) => {
        //     if (searchTerm.toLowerCase().includes(value.toLowerCase())) {
        //         result.push({villain: value, term: searchTerm});
        //         return result 
        //     } else {
        //         return result
        //     }
        // }, []);
        results = _.filter(villains, (val) => {
            return val.toLowerCase().includes(searchTerm.toLowerCase())
        })
        data = {
            results: results,
            searchTerm: searchTerm
        }
    }
    res.render('oracle', data);
}

module.exports = {oracleSearch}