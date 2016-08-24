const JsonError = require('errors/JsonError');

class NotFoundError extends JsonError {
    constructor(message, errorCode = 0) {
        super(message, 404, errorCode);
    }
}

module.exports = NotFoundError;
