const MessageModel = require('../models/message');

exports.newMessage = async (req, res, next) => {
    console.log(req.body);
    try {
        const newMessage = await MessageModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            newMessage
        });
    }
    catch (error) {
        next(error);
    }
}

// Get all messages
exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await MessageModel.find({ is_deleted: false })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            messages
        });
    }
    catch (error) {
        next(error);
    }
}

// Delete message
exports.deleteMessage = async (req, res, next) => {
    try {
        const message = await MessageModel.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
}
