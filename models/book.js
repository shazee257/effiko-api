const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: String,
        image: String,
        book: String,
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

bookSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

bookSchema.virtual('id').get(function () {
    return this._id;
});

bookSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('book', bookSchema);