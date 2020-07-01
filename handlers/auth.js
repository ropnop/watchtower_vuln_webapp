require('rootpath')();
const _ = require('lodash');

function authMiddleware(req, res, next) {
    if (req.path === "/login" || req.path === "/register") {
        next();
    }
    else if (req.session.isNew) {
        res.redirect('/login');
    } else {
        next();
    }
}

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
        res.redirect('/home');
    }

}

function logout(req, res) {
    req.session = null
    res.redirect('/home');
}

module.exports = {authMiddleware, loginPage, login, registerPage, register, logout}