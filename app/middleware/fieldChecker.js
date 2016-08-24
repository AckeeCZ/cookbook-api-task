const _ = require('lodash');
const PrivateUtils = require('components/PrivateUtils');

const neverUpdate = ['created', 'updated', '_id', '__v'];

exports.bodyDontHave = (arr = []) => {
    return (req, res, next) => {
        return next(PrivateUtils.dontHaveError(req.body, _.concat(arr, neverUpdate),
            {prefix: 'Field ', postfix: ' cannot be updated'}));
    };
};

exports.bodyMandatory = (arr = []) => {
    return (req, res, next) => {
        return next(PrivateUtils.mandatoryError(req.body, arr, {prefix: 'Field ', postfix: ' is mandatory in body'}));
    };
};

exports.queryMandatory = (arr = []) => {
    return (req, res, next) => {
        return next(PrivateUtils.mandatoryError(req.query, arr, {prefix: 'Field ', postfix: ' is mandatory in query'}));
    };
};
