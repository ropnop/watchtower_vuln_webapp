const {heroes} = require('../data/heroes_and_villains')

const notEnoughCredits = "You don't have enough credits to do that!"
const heroNotExists = "That hero doesn't exist!"

function creditsPage(req, res) {
    res.render('credits', {heroes: heroes})
}

function transferCredits(req, res) {
    const {amount, recipient} = req.body
    const available = req.session.credits
    if (amount > available) {
        res.render('credits', {error: notEnoughCredits, heroes: heroes})
    } else {
        req.session.credits = req.session.credits - amount;
        res.render('credits', {success: true, amount: amount, recipient: recipient, heroes: heroes})
    }
}

module.exports = {creditsPage, transferCredits}