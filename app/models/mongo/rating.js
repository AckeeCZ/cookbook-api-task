const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    score: {type: Number, required: true},
    recipe: {type: Schema.Types.ObjectId, ref: 'Recipe', required: true},
});

ratingSchema.options.toJSON = {
    transform(ratingDocument, ret, options) { // eslint-disable-line no-unused-vars
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
};

mongoose.model('Rating', ratingSchema);
module.exports = ratingSchema;
