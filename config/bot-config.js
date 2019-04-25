module.exports = require('fs').existsSync(`${__dirname}/env/local.js`)
    ? require('./env/local')
    : require('./env/production');