const facade = require('facade/facade');
const ValidationError = require('errors/ValidationError');
const BadRequestError = require('errors/BadRequestError');

exports.create = (req, res, next) => {
    return exports.checkExistingRecipe(req.body.name).then(() => {
        return facade.recipeCreate(req.body);
    }).then(recipe => {
        res.out = recipe;
        return next();
    }).catch(next);
};

exports.detail = (req, res, next) => {
    return facade.recipeDetailWithScore({_id: req.recipeId}).then(recipe => {
        res.out = recipe;
        return next();
    }).catch(next);
};

exports.list = (req, res, next) => {
    return facade.recipeList().then(recipeList => {
        res.out = recipeList;
        return next();
    }).catch(next);
};

exports.delete = (req, res, next) => {
    return facade.recipeDelete(req.recipeId).then(() => {
        res.out = {};
        res.status(204);
        return next();
    }).catch(next);
};

exports.update = (req, res, next) => {
    return exports.checkExistingRecipe(req.body.name).then(() => {
        return facade.recipeUpdate(req.body, req.recipeId);
    }).then(recipe => {
        res.out = recipe;
        return next();
    }).catch(next);
};

exports.checkExistingRecipe = name => {
    if (name.toUpperCase().indexOf('ACKEE') === -1) {
        return Promise.reject(
            new BadRequestError('Name must obtain Ackee at least once! This is Ackee cookbook GOD DAMN IT.')
        );
    }
    return facade.recipeDetail({name}).then(recipe => {
        if (recipe) {
            throw new ValidationError('Recipe with this name already exists');
        }

        return true;
    });
};
