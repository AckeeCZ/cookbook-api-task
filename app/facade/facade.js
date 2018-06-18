const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const Rating = mongoose.model('Rating');

const NotFoundError = require('errors/NotFoundError');
const _ = require('lodash');

exports.recipeCreate = object => {
    return (new Recipe(object)).save();
};

exports.recipeDetail = params => {
    return Recipe.findOne(params);
};

exports.recipeDetailWithScore = params => {
    return Recipe.findOne(params).then(recipe => {
        if (!recipe) {
            throw new NotFoundError();
        }
        return exports.recipeAverageScore(recipe.id).then(avg => {
            const recipeJson = recipe.toJSON();
            recipeJson.score = avg;
            return recipeJson;
        });
    });
};

exports.recipeList = params => {
    return Recipe.find(params);
};

exports.recipeUpdate = (object, id) => {
    return Recipe.findOneAndUpdate({_id: id}, {$set: object}, {new: true});
};

exports.recipeDelete = id => {
    return Recipe.findByIdAndRemove({_id: id});
};

exports.recipePurge = () => {
    return Recipe.remove({});
};

exports.ratingCreate = object => {
    return (new Rating(object)).save();
};

exports.ratingPurge = () => {
    return Rating.remove({});
};

exports.recipeAverageScore = id => {
    return Rating.find({recipe: id}).then(recipes => {
        if (!recipes || recipes.length === 0) {
            return 0;
        }

        let sum = 0;
        _(recipes).forEach(val => {
            sum += val.score;
        });

        return sum / recipes.length;
    });
};
