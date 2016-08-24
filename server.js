require('i18n-2');
require('express-winston');
require('swig');
require('winston');
require('mongoose');
require('use-strict');

const winston = require('components/Winston');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const config = require('config');

const app = express();
const port = process.env.PORT || config.port;

if (!config.params.useRelationDb) {
// Connect to mongodb
    const connect = function() {
        const options = {server: {socketOptions: {keepAlive: 1}}};
        mongoose.connect(config.db, options);
    };
    connect();

    mongoose.connection.on('error', winston.error); // eslint-disable-line no-console
    mongoose.connection.on('disconnected', connect);

// Bootstrap models
    fs.readdirSync(`${__dirname}/app/models/mongo/`).forEach(function(file) {
        if (~file.indexOf('.js')) {
            require(`${__dirname}/app/models/mongo/${file}`); // eslint-disable-line global-require
        }
    });
}

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
winston.log('info', `Starting client for node-template at port ${port}`);

require('dbInit');
