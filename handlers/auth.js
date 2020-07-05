require('rootpath')();
const _ = require('lodash');
const {v4: uuid} = require('uuid')
const {heroes} = require('../data/heroes_and_villains')

function loginPage (req, res) {
    res.render('login');
}

function login (req, res) {
    res.render('todo');
}

function registerPage (req, res) {
    res.render('register');
}


const registrationCode = "Just1c3L34gue";

function register(req, res) {
    let {name, identity, code } = req.body
    if (heroes.includes(name)) {
        res.render('error', {message: 'That super hero name is already taken by a member!'})
    } else if (code !== registrationCode) {
        res.render('error', {message: 'Bad registration code'});
    } else {
        req.session.username = name;
        req.session.identity = identity;
        req.session.credits = 1000;
        req.session.secretKey = uuid();
        res.redirect('/home');
    }

}

function logout(req, res) {
    req.session = null
    res.redirect('/home');
}

function whoami(req, res) {
    const {username, identity, credits} = req.session
    const data = {username: username, identity: identity, credits: credits}
    res.json(data)
}

module.exports = {loginPage, login, registerPage, register, logout, whoami}