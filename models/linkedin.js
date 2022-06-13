const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedinSchema = new Schema(
    {
        user_name: String,
        linkedin_email: { type: String, required: true, unique: true },
        cv: { type: String, required: true },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

linkedinSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

module.exports = mongoose.model('linkedin', linkedinSchema);