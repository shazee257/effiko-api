const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisorSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        phone_no: { type: String },
        linkedin_url: { type: String },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

advisorSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

advisorSchema.virtual('id').get(function () {
    return this._id;
});

advisorSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('advisor', advisorSchema);