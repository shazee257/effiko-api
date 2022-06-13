const router = require('express').Router();

const {
    createInterview, getAllInterviews, updateInterview, deleteInterview
} = require('../controllers/interview');

// Create a new interview
router.post('/', createInterview);

// Get all interviews
router.get('/', getAllInterviews);

// Update a interview
router.put('/:interviewId', updateInterview);

// Delete a interview
router.delete('/:interviewId', deleteInterview);


module.exports = router;