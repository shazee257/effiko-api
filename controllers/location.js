const LocationModel = require('../models/location');

// Create a new location
exports.addLocation = async (req, res, next) => {
    try {
        const location = await LocationModel.create(
            {
                coordinates: { lng: req.body.lng, lat: req.body.lat }
            }
        );

        res.status(200).json({
            success: true,
            message: 'Location created successfully',
            location
        });
    } catch (error) {
        next(error);
    }
}

// Get all locations
exports.getLocations = async (req, res, next) => {
    try {
        const locations = await LocationModel.find({ is_deleted: false });

        res.status(200).json({
            success: true,
            message: 'Locations retrieved successfully',
            locations
        });
    } catch (error) {
        next(error);
    }
}

// Delete a location
exports.deleteLocation = async (req, res, next) => {
    try {
        const location = await LocationModel.findByIdAndUpdate(
            req.params.locationId,
            { is_deleted: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Location deleted successfully',
            location
        });
    } catch (error) {
        next(error);
    }
}