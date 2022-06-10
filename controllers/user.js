const UserModel = require('../models/user');
const SessionModel = require('../models/session');
const AddressModel = require('../models/address');
var crypto = require("crypto");
const bcrypt = require('bcrypt');
const { comparePassword, verifyIdWithToken } = require("../utils/utils");
const moment = require("moment");
const { transporter } = require('../utils/mailSender');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Get user by token
exports.getUser = async (req, res, next) => {
    verifyIdWithToken(req.params.userId, req.user._id);

    try {
        const user = await UserModel.findOne({
            _id: req.user._id, is_deleted: false
        }).populate('address_ids');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({ is_deleted: false });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Register a user
exports.registerUser = async (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword || !req.body.email) {
        return res.status(400).json({
            success: false,
            message: 'Empty fields are not allowed.'
        });
    }

    // password and confirm password should be same
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Password and confirm password should be same.'
        });
    }

    try {
        const userExisted = await UserModel.findOne({ email: req.body.email });
        if (userExisted) {
            return res.status(409).json({
                success: false,
                message: 'User already existed.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = await UserModel.create(req.body);
        await user.save();
        res.status(200).json({ user, message: "User is created successfully." });
    } catch (error) {
        res.status(401).json({
            message: "User is not created.",
            error: error.mesage,
        })
        next(error);
    }
};

// Delete a user by setting is_deleted = true
exports.deleteUser = async (req, res, next) => {
    verifyIdWithToken(req.params.userId, req.user._id);

    try {
        const user = await UserModel.findByIdAndUpdate(req.params.userId, { is_deleted: true });
        res.status(200).json({ user, message: "User is deleted successfully." });
    } catch (error) {
        next(error);
    }
};

// Delete all users (is_deleted = true)
exports.deleteUsers = async (req, res, next) => {
    try {
        const users = await UserModel.updateMany({ _id: { $in: req.body.ids } }, { is_deleted: true });
        res.status(200).json({ message: 'Users deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    verifyIdWithToken(req.params.userId, req.user._id);

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id, req.body, { new: true }
        );
        res.status(200).json({
            user: updatedUser,
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Change password
exports.changePassword = async (req, res, next) => {
    // new password should not match with old password
    if (req.body.newPassword === req.body.oldPassword) {
        return res.status(400).json({
            status: 400,
            message: "New Password should be different from old password",
        });
    }

    try {
        const user = await UserModel.findOne({ _id: req.user._id, is_deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false, message: 'User not found'
            });
        }

        const isEqual = await comparePassword(
            req.body.oldPassword,
            user.password
        );

        if (!isEqual) {
            return res.status(400).json({
                status: 400, message: "Old Password is not correct",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.newPassword, salt);

        await UserModel.findByIdAndUpdate(req.user._id, { password: password });
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
}

// Login
exports.loginUser = async (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields.'
        });
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email, is_deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isEqual = await comparePassword(
            req.body.password,
            user.password
        );

        if (!isEqual) {
            return res.status(400).json({
                status: 400,
                message: "Incorrect password, please try again",
            });
        }

        const session = await SessionModel.create({
            token: crypto.randomBytes(16).toString("base64"),
            user_id: user._id,
            expiry_date: new Date(moment().add(process.env.SESSION_EXPIRY_DAYS, "days"))
        });

        res.status(200).json({
            success: true,
            user: user,
            session,
        });
    } catch (error) {
        next(error);
    }
}

// Forgot password
exports.forgotPassword = async (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: 'Please type your email.'
        });
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email, is_deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email not found'
            });
        }

        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                throw err;
            }
            const token = buffer.toString("hex");
            user.reset_password_token = token;
            user.reset_token_expires = Date.now() + (24 * 3600000); // 24 hour

            user.save();
            const resetUrl = `${process.env.FRONTEND_URI}/reset-password/${token}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Reset Password",
                html: `
                        <p>You requested a password reset</p>
                        <p>Click this <a href="${resetUrl}">link</a> to set a new password.</p>
                    `
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email is not sent', err
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Email sent',
                });
            });
        });



    } catch (error) {
        next(error);
    }

}

// Reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            reset_password_token: req.params.resetToken, is_deleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Token not found'
            });
        }

        if (user.reset_token_expires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Token expired'
            });
        }

        res.status(200).json({
            success: true,
            userId: user._id,
        });
    } catch (error) {
        next(error);
    }
}

// New password
exports.newPassword = async (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Password and confirm-password should be same.'
        });
    }

    try {
        const user = await UserModel.findOne({ _id: req.params.userId, is_deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        user.password = password;
        user.reset_password_token = null;
        user.reset_token_expires = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'New password set successfully'
        });
    } catch (error) {
        next(error);
    }
}

// Create new Address
exports.createAddress = async (req, res, next) => {
    // if (!req.body.first_name || !req.body.last_name || !req.body.address || !req.body.unit ||
    //     !req.body.city || !req.body.state || !req.body.zip_code) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Please fill required fields.'
    //     });
    // }

    try {
        const user = await UserModel.findOne({ _id: req.user._id, is_deleted: false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const address = await AddressModel.create(req.body);
        await address.save();

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id, { $push: { address_ids: address._id } }, { new: true }
        );

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Address added successfully'
        });
    } catch (error) {
        next(error);
    }
}

// Update Address
exports.updateAddress = async (req, res, next) => {
    // if (!req.body.first_name || !req.body.last_name || !req.body.address || !req.body.unit ||
    //     !req.body.city || !req.body.state || !req.body.zip_code) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Please fill required fields.'
    //     });
    // }

    try {
        const address = await AddressModel.findOne({ _id: req.params.addressId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        const updatedAddress = await AddressModel.findByIdAndUpdate(
            req.params.addressId, req.body, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            address: updatedAddress
        });
    } catch (error) {
        next(error);
    }
}

// Get Addresses
exports.getAddresses = async (req, res, next) => {
    verifyIdWithToken(req.params.userId, req.user._id);

    try {
        const user = await UserModel.findOne({ _id: req.user._id, is_deleted: false });
        console.log(`user ${user}`);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const addresses = await AddressModel.find({ _id: { $in: user.address_ids } });

        res.status(200).json({
            success: true,
            addresses
        });
    } catch (error) {
        next(error);
    }
}

// Delete Address
exports.deleteAddress = async (req, res, next) => {
    try {
        const address = await AddressModel.findOne({ _id: req.params.addressId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        await AddressModel.findByIdAndDelete(req.params.addressId);

        // delele address_id from user
        await UserModel.findByIdAndUpdate(req.user._id, { $pull: { address_ids: req.params.addressId } });

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

// Upload Image & Thumbnails
exports.uploadUserImage = async (req, res, next) => {
    if (req.file) {
        if (req.fileValidationError) {
            return res.status(400).json({
                status: 400, message: req.fileValidationError,
            });
        }

        try {
            fs.unlink("src/assets/uploads/thumbs/" + req.user.image, (err) => {
                if (err) throw err;
            });

            await sharp(req.file.path, { failOnError: false })
                .resize(128, 128)
                .withMetadata()
                .toFile(path.resolve(`src/assets/uploads/thumbs/${req.file.filename}`))
        } catch (error) {
            next(error);
        }

        try {
            if (req.user.image) {
                fs.unlink("src/assets/uploads/" + req.user.image, (err) => {
                    if (err) throw err;
                });
            }

            await UserModel.findOneAndUpdate(
                { _id: req.user._id, is_deleted: false },
                { image: req.file.filename }
            );
        } catch (error) {
            next(error);
        }

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
        });
    }

    return res.status(400).json({
        status: 400,
        message: "Please upload file.",
    });
}


