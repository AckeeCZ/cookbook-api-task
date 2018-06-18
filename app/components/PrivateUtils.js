const bcrypt = require('bcryptjs');
const _ = require('lodash');

const BadRequestError = require('errors/BadRequestError');

/**
 * Generates random alphanumeric code*
 * @param num Number of characters
 * @returns {string} Random alphanumeric
 */
exports.generateRandomAlphanumeric = (num) => {
    return crypto.randomBytes(Math.ceil(num * 3 / 4))
    // convert to base64 format
        .toString('base64')
        // return required number of characters
        .slice(0, num)
        // replace '+' with '0'
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
};

exports.encodeBcrypt = plain => {
    return new Promise((resolve, reject) => {
        return bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return reject(err);
            }
            return bcrypt.hash(plain, salt, (errHash, hash) => {
                if (errHash) {
                    return reject(errHash);
                }
                return resolve({salt, hash});
            });
        });
    });
};

exports.compareBcrypt = (plain, hashed) => {
    return new Promise((resolve, reject) => {
        return bcrypt.compare(plain, hashed, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
};

exports.ifNotArrayToArray = (notArr = []) => {
    if (!_.isArray(notArr)) {
        notArr = [notArr];
    }
    return notArr;
};

exports.mandatoryError = (source = {}, arr = [],
                          text = {prefix: 'Field ', postfix: ' is mandatory'}) => {
    arr = exports.ifNotArrayToArray(arr);

    let response;
    arr.forEach(field => {
        if (!source[field]) {
            response = new BadRequestError(text.prefix + field + text.postfix);
        }
    });

    return response;
};

exports.dontHaveError = (source = {}, arr = [],
                         text = {prefix: 'Field ', postfix: ' cannot be updated'}) => {
    arr = exports.ifNotArrayToArray(arr);

    let response;
    arr.forEach(field => {
        if (source[field]) {
            response = new BadRequestError(text.prefix + field + text.postfix);
        }
    });

    return response;
};

exports.fullUrlFromReq = req => {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
};

exports.buildHttpGatewayObject = (name, id, url, endpoints) => {
    const endpointsOut = [];
    endpoints.forEach(endpoint => {
        endpointsOut.push(
            {
                auth: {
                    enabled: endpoint.auth,
                },
                public: {
                    api: endpoint.api,
                    method: endpoint.method,
                },
                micro: {
                    url,
                    type: {
                        name: 'HTTP',
                        method: endpoint.method,
                    },
                },
            }
        );
    });
    return {
        identity: {
            name, id,
        },
        endpoints: endpointsOut,
    };
};

exports.idChange = object => {
    if (object._id) {
        object.id = object._id;
        delete object._id;
    }
};
