const facade = require('facade/facade');

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const recipe = require('controllers/api/recipe');
const rating = require('controllers/api/rating');

const fieldChecker = require('middleware/fieldChecker');

router.param('recipeId', function(req, res, next, id) {
    facade.recipeDetail({_id: id});
    req.recipeId = id;
    return next();
});

router.get('/recipes/:recipeId', recipe.detail);
router.get('/recipes', recipe.list);
router.delete('/recipes/:recipeId', recipe.delete);
router.put('/recipes/:recipeId', recipe.update);
router.post('/recipes', fieldChecker.bodyMandatory(['name', 'description']), recipe.create);
router.post('/recipes/:recipeId/ratings', fieldChecker.bodyMandatory(['score']), rating.create);

module.exports = router;
