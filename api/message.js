const router = require('express').Router();

const {
    newMessage, getAllMessages, deleteMessage
} = require('../controllers/message');

// New message
router.post('/', newMessage);

// Get all messages
router.get('/', getAllMessages);

// Delete message
router.delete('/:id', deleteMessage);

module.exports = router;