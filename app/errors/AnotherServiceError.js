/**
 * Created by ejdy on 30.5.16.
 */
const JsonError = require('errors/JsonError');

class AnotherServiceError extends JsonError {
    constructor(message, statusCode, errorCode = 0) {
        super(message, statusCode, errorCode);
    }
}

module.exports = AnotherServiceError;
