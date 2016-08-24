const facade = require('facade/facade');
const _ = require('lodash');

const BadRequestError = require('errors/BadRequestError');
const NotFoundError = require('errors/NotFoundError');

exports.create = (req, res, next) => {
    if (!_.isNumber(req.body.score)) {
        return next(new BadRequestError('Score must be number'));
    }

    if (req.body.score < 0 || req.body.score > 5) {
        return next(new BadRequestError('Score must be between 0 and 5'));
    }

    return facade.recipeDetail({_id: req.recipeId}).then(recipe => {
        if (!recipe) {
            throw new NotFoundError('Recipe does not exist');
        }

        req.body.recipe = req.recipeId;
        return facade.ratingCreate(req.body);
    }).then(rating => {
        res.out = rating;
        return next();
    }).catch(next);
};
