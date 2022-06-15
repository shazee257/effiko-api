const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        user_name: { String },
        email: { type: String, required: true, unique: true },
        body: { type: String, required: true },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

messageSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

messageSchema.virtual('id').get(function () {
    return this._id;
});


messageSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('message', messageSchema);