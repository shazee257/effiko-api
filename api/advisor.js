const router = require('express').Router();
const { imageUpload } = require('../utils/utils');

const {
    createAdvisor, getAllAdvisors, getAdvisorById,
    updateAdvisor, deleteAdvisor, updateAdvisorImage

} = require('../controllers/advisor');

// Create a new course
router.post('/', imageUpload.single('image'), createAdvisor);

// Get a advisor
router.get('/:advisorId', getAdvisorById);

// Get all advisors
router.get('/', getAllAdvisors);

// Update a advisor
router.put('/:advisorId', updateAdvisor);

// Update image
router.put('/:advisorId/image', imageUpload.single('image'), updateAdvisorImage);

// Delete a advisor
router.delete('/:advisorId', deleteAdvisor);


module.exports = router;