const JsonError = require('errors/JsonError');

class UnauthorizedError extends JsonError {
    constructor(message, errorCode = 0) {
        super(message, 401, errorCode);
    }
}

module.exports = UnauthorizedError;
