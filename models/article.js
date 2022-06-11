const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        body: { type: String },
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

module.exports = mongoose.model('article', articleSchema);