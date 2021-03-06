const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        body: { type: String },
        image: String,
        category_id: { type: Schema.Types.ObjectId, ref: 'category' },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

articleSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

articleSchema.virtual('id').get(function () {
    return this._id;
});

articleSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('article', articleSchema);