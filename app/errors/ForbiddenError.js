const JsonError = require('errors/JsonError');

class ForbiddenError extends JsonError {
    constructor(message, errorCode = 0) {
        super(message, 403, errorCode);
    }
}

module.exports = ForbiddenError;
