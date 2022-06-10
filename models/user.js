const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        // Common fields
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String, unique: true, required: true },
        role: { type: String, enum: ['admin', 'seller', 'customer', 'user'], default: 'customer' },
        phone_no: { type: String },
        image: { type: String },
        alternet_phone_no: String,
        password: { type: String, required: true },
        reset_password_token: String,
        reset_token_expires: { type: Date },
        address_ids: [{ type: Schema.Types.ObjectId, ref: 'address' }],
        is_deleted: { type: Boolean, default: false },

        // Seller fields specifically
        shop_name: { type: String },
        shop_banner: { type: String },
        seller_address: {
            type: {
                address_line_1: { type: String },
                address_line_2: { type: String },
                city: { type: String },
                state: { type: String },
                country: { type: String },
                zip_code: { type: String },
            },
        },
        status: { type: String, enum: ['pending', 'approved'], default: 'pending' },


    },
    { timestamps: true }
);

userSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password']
        delete ret['__v']
        delete ret['updatedAt']
        return ret
    }
})

module.exports = mongoose.model('user', userSchema);


