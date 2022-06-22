const SubscriptionModel = require('../models/subscription');

// Create a new subscription
exports.createSubscription = async (req, res, next) => {
    try {
        const subscription = await SubscriptionModel.create(req.body);
        res.status(200).json({
            success: true,
            subscription
        });
    }
    catch (error) {
        next(error);
    }
}

// Get all subscriptions
exports.getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await SubscriptionModel.find({ is_deleted: false })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            subscriptions
        });
    }
    catch (error) {
        next(error);
    }
}

// Delete subscription
exports.cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await SubscriptionModel.findByIdAndUpdate(
            req.params.subscriptionId,
            { is_deleted: true }, { new: true }
        );

        res.status(200).json({
            success: true,
            subscription,
            message: 'News Subscription cancelled successfully'
        });
    }
    catch (error) {
        next(error);
    }
}

