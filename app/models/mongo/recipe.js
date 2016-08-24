const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    ingredients: [{type: String}],
});

recipeSchema.options.toJSON = {
    transform(recipeDocument, ret, options) { // eslint-disable-line no-unused-vars
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
};

mongoose.model('Recipe', recipeSchema);
module.exports = recipeSchema;
