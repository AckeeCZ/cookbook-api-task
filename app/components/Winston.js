const winston = require('winston');
const config = require('config');

function transportsMethod() {
    const transports = [];
    const consoleSettings = {};
    if (config.params.testLogs) {
        consoleSettings.json = true;
    }
    transports.push(new (winston.transports.Console)(consoleSettings));

    return transports;
}

const logger =
    new winston.Logger({
        level: config.winston.level,
        transports: transportsMethod(),
    });

module.exports = logger;
