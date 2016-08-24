const crud = require('routes/crud');
const PrivateUtils = require('components/PrivateUtils');

const NotFoundError = require('errors/NotFoundError');

const winston = require('components/Winston');

module.exports = function(app) {
    app.use('/api/v1', crud);

    // Default error handler
    app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
        if (err && err.message && err.message.indexOf('Cast to ObjectId failed') >= 0) {
            return next();
        }

        const status = err.status || 500;
        const url = PrivateUtils.fullUrlFromReq(req);

        if (status === 500) {
            // region Winston
            winston.error({
                err,
                url,
                stack: err.stack,
                message: err.message,
            });
            // endregion
        } else {
            // region Winston
            winston.debug({
                err, url, message: err.message,
            });
            // endregion
        }
        res.status(status);
        return res.json({err, message: err.message});
    });

    // Default middleware, that ends everything - either parse return value or send 404 if nothing was found
    app.use(function(req, res, next) { // eslint-disable-line no-unused-vars
        if (res.out) {
            return res.json(res.out);
        }

        const error = new NotFoundError('Not Found');
        // region Winston
        winston.debug({
            error,
            url: PrivateUtils.fullUrlFromReq(req),
        });
        // endregion
        res.status(404);
        return res.json(new NotFoundError('Not Found'));
    });
};
