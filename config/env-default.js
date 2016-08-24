/**
 *
 * Default to all the environments, if you do not rewrite it, it became this
 */

module.exports = {
    db: 'mongodb://localhost:27017/cookbook',
    baseUrlAddress: 'http://localhost:3000/',
    port: 3000,
    params: {
        useWinstonWithMorgan: false,
        useWinstonWithLoggly: false,
        useWinstonWithLogsene: false,
        useWinstonAlternateLogger: false,
        swigCache: false,
    },
    i18n: {
        locales: ['en', 'cs'],
        defaultLocale: 'en',
        cookieName: 'locale',
        extension: '.json',
    },
    winston: {
        level: 'silly',
    },
};
