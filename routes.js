require('rootpath')();
const express = require('express');
const badCors = require('./libraries/badcors');

const homepage = require('./handlers/homepage')
const auth = require('./handlers/auth')
const secretKey = require('./handlers/secretKey')
const oracle = require('./handlers/oracle')
const locations = require('./handlers/locations')
const credits = require('./handlers/credits');
const batcave = require('./handlers/batcave');



const router = express.Router();


router.get('/', (req, res) => {
    return res.redirect('/home');
})
router.get('/home', homepage)

router.get('/login', auth.loginPage);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/api/me', badCors, auth.whoami);

router.get('/register', auth.registerPage);
router.post('/register', auth.register);

router.get("/secretkey", secretKey.keyPage);

router.get("/api/secretkey", badCors, secretKey.fetchKey);

router.get('/oracle/villains', oracle.villainSearch);
router.get('/oracle/heroes',oracle.heroSearch);
router.get('/api/heroes', oracle.heroAPI);


router.get('/admin/batcave', (req, res) => res.render('batcave'));
router.get('/api/batcave/authorize', batcave.authorize);

router.get('/locations', locations.locationsPage);
router.post('/locations', locations.queryLocations);

router.get('/credits', credits.creditsPage);
router.post('/credits', credits.transferCredits);

router.all('*', (req, res) => {
    res.status(404).render('error', {message: "Page not found"})
});

module.exports = router