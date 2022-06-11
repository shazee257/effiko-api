const router = require('express').Router();

const {
    createSubscription, getAllSubscriptions,
    cancelSubscription,

} = require('../controllers/subscription');

// New subscription
router.post('/', createSubscription);

// Get all subscriptions
router.get('/', getAllSubscriptions);

// Delete a subscription
router.delete('/:subscriptionId', cancelSubscription);

module.exports = router;