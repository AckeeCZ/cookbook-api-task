require('chai');
require('../server');

require('chai').should();

const winston = require('winston');
winston.remove(winston.transports.Console);

describe('Describe test', function() {
    it('It test', function(done) {
        done();
    });
});
