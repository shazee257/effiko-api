const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String },
        url: { type: String, required: true, unique: true },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

interviewSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

module.exports = mongoose.model('interview', interviewSchema);