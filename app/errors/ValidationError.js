const JsonError = require('errors/JsonError');

class ValidationError extends JsonError {
    constructor(message, errorCode = 0) {
        super(message, 422, errorCode);
    }
}

module.exports = ValidationError;
