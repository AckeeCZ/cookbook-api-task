const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const winston = require('components/Winston');
const helpers = require('view-helpers');
const config = require('config');
const pkg = require('../package.json');
const swig = require('swig');
const i18n = require('i18n-2');
const expressWinston = require('express-winston');

const env = process.env.NODE_ENV || 'development';

module.exports = function(app) {
    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512,
    }));

    // Static files middleware
    app.use(express.static(`${config.root}/public`));

    // Use winston on production
    let log;
    if (config.params.useWinstonWithMorgan) {
        log = {
            stream: {
                write(message, encoding) { // eslint-disable-line no-unused-vars
                    winston.info(message);
                },
            },
        };
    } else {
        log = 'dev';
    }

    // Don't log during tests
    // Logging middleware
    if (config.params.testLogs) {
        app.use(expressWinston.logger({
            winstonInstance: winston,
        }));
    } else {
        if (config.params.useWinstonWithLoggly) {
            app.use(morgan('combined', log));
        } else {
            app.use(morgan('combined'));
        }
    }

    swig.setDefaults({
        cache: config.params.swigCache,
    });

    // set views path, template engine and default layout
    app.engine('html', swig.renderFile);
    app.set('views', `${config.root}/app/views}`);
    app.set('view engine', 'html');

    // expose package.json to views
    app.use(function(req, res, next) {
        res.locals.pkg = pkg;
        res.locals.env = env;
        next();
    });

    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(bodyParser.json());
    app.use(methodOverride(function(req, res) { // eslint-disable-line no-unused-vars
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
        return null;
    }));

    // cookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));
    // app.use(session({
    //  secret: pkg.name,
    //  proxy: true,
    //  resave: true,
    //  saveUninitialized: true,
    //  store: new mongoStore({
    //    url: config.db,
    //    collection : 'sessions'
    //  })
    // }));

    // i18n
    i18n.expressBind(app, config.i18n);

    app.use(function(req, res, next) {
        req.i18n.setLocaleFromQuery();
        req.i18n.setLocaleFromCookie();
        next();
    });

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

    // adds CSRF support
    /* if (process.env.NODE_ENV !== 'test') {
     //app.use(csrf());

     // This could be moved to view-helpers :-)
     app.use(function(req, res, next){
     //  res.locals.csrf_token = req.csrfToken();
     next();
     });
     }*/
};
