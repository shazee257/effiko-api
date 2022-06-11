const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
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

module.exports = mongoose.model('category', categorySchema);