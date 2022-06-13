const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
    {
        coordinates: { lng: Number, lat: Number },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

locationSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

module.exports = mongoose.model('location', locationSchema);