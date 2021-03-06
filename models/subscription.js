const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
    {
        user_name: { type: String },
        email: { type: String, unique: true, required: true },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

subscriptionSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

subscriptionSchema.virtual('id').get(function () {
    return this._id;
});

subscriptionSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('subscription', subscriptionSchema);