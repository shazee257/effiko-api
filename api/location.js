const router = require('express').Router();

const {
    addLocation, getLocations, deleteLocation
} = require('../controllers/location');

// Create a new location
router.post('/', addLocation);

// Get all locations
router.get('/', getLocations);

// Delete a location
router.delete('/:locationId', deleteLocation);


module.exports = router;