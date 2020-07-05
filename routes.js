require('rootpath')();
const express = require('express');

const router = express.Router();

var handlers = require('require-all')(__dirname + '/handlers');

router.get('/', (req, res) => {
    return res.redirect('/home');
})
router.get('/home', handlers.homepage)

router.get('/login', handlers.auth.loginPage);
router.post('/login', handlers.auth.login);
router.get('/logout', handlers.auth.logout);

router.get('/register', handlers.auth.registerPage);
router.post('/register', handlers.auth.register);

router.get("/secretkey", handlers.secretKey.keyPage);

const badCors = require('./libraries/badcors');
router.get("/api/secretkey", badCors, handlers.secretKey.fetchKey);

router.get('/oracle/villains', handlers.oracle.villainSearch);
router.get('/oracle/heroes', handlers.oracle.heroSearch);
router.get('/api/heroes', handlers.oracle.heroAPI);



router.get('/admin/debug', handlers.todo);
router.get('/admin/batcave', handlers.todo);

router.get('/locations', handlers.locations.locationsPage);
router.post('/locations', handlers.locations.queryLocations);

router.get('/credits', handlers.credits.creditsPage);
router.post('/credits', handlers.credits.transferCredits);

router.all('*', (req, res) => {
    res.status(404).render('error', {message: "Page not found"})
});

module.exports = router