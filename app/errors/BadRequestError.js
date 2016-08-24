const JsonError = require('errors/JsonError');

class BadRequestError extends JsonError {
    constructor(message, errorCode = 0) {
        super(message, 400, errorCode);
    }
}

module.exports = BadRequestError;
