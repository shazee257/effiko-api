const router = require('express').Router();
const { cvUpload } = require('../utils/utils');

const {
    createLinkedin, getAllLinkedin, deleteLinkedin,
} = require('../controllers/linkedin');

// Create a new course
router.post('/', cvUpload.single('cv'), createLinkedin);

// Get all linkedin data
router.get('/', getAllLinkedin);

// Delete a linkedin data
router.delete('/:linkedinId', deleteLinkedin);







module.exports = router;