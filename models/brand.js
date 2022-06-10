const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        description: String,
        image: String,
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

brandSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        delete ret['createdAt']
        return ret
    }
})

module.exports = mongoose.model('brand', brandSchema);

