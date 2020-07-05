const express = require('express');
const exphbs = require('express-handlebars');
const log4js = require('log4js');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const {logger, config} = require('./conf/config');
const router = require('./routes');
const errroHandler = require('./handlers/error-handler');
const {authMiddleware, userView} = require('./libraries/session');
const db = require('./libraries/database');

const app = express();

app.use(log4js.connectLogger(logger));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'session',
    keys: [config.tokenKey],
    maxAge: 24*60*60*1000, //24hours
    httpOnly: false
}));

app.use(authMiddleware);
app.use(userView);

app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

app.use('/static', express.static(path.join(__dirname, "static")));

app.use(errroHandler);

app.use('/', router);

app.set('db', db);

app.listen(config.port, () => {
    logger.info(`Environment: ${config.env}`)
    logger.info(`Server running on port ${config.port}`)
})

module.exports = app