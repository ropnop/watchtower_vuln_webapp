require('rootpath')();
const _ = require('lodash');
const {v4: uuid} = require('uuid')

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
    if (code !== registrationCode) {
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
    const data = req.session
    delete data['secretKey']
    res.json(data)
}

module.exports = {loginPage, login, registerPage, register, logout, whoami}