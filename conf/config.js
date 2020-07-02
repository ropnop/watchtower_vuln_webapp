const env = process.env.NODE_ENV || "dev";
const port = process.env.NODE_PORT || 3000;

const tokenKey = process.env.TOKEN_KEY || "devinsecurekey";

const log4js = require('log4js');
const logger = log4js.getLogger();

if (env == 'dev') {
    logger.level = 'debug';
} else {
    logger.level = 'none';
}

const config = {
    env: env,
    port: port,
    tokenKey: tokenKey
}

module.exports = {logger, config}