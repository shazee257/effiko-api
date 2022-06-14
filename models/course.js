const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        image: { type: String },
        description: { type: String },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

courseSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

courseSchema.virtual('id').get(function () {
    return this._id;
});

courseSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('course', courseSchema);