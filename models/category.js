const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: String,
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

categorySchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

categorySchema.virtual('id').get(function () {
    return this._id;
});

categorySchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('category', categorySchema);