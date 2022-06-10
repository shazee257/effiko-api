const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
        detail_1: String,
        detail_2: String,
        category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        price: { type: Number },
        images: [String],
        discount: { type: Number, default: 0 },

        is_size: { type: Boolean, default: false },
        is_color: { type: Boolean, default: false },

        // sizes only
        sizes: [{ size: String, price: Number, color: String }],
        // OR
        // colors only
        colors: [{ color: String, images: [String] }],

        attr: [{
            color: String,
            images: [String],
            sizes: [{ name: String, price: Number }]
        }],

        sizes: [{
            size: { type: String },
            price: { type: Number },
            colors: [{
                color: { type: String },
                images: [{ type: String }]
            }]
        }],


        online_only: { type: Boolean, default: false },
        is_deleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

productSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['__v']
        delete ret['updatedAt']
        delete ret['createdAt']
        return ret
    }
})

module.exports = mongoose.model('Product', productSchema);
