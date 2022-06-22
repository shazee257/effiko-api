const AdvisorModel = require('../models/advisor');
const fs = require('fs');

// Create a new advisor
exports.createAdvisor = async (req, res, next) => {
    try {
        const advisor = await AdvisorModel.create({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
            linkedin_url: req.body.linkedin_url,
            phone_no: req.body.phone_no,
        });

        res.status(200).json({
            success: true,
            advisor
        });
    } catch (error) {
        next(error);
    }
};

// Get all advisors
exports.getAllAdvisors = async (req, res, next) => {
    try {
        const advisors = await AdvisorModel.find({ is_deleted: false })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            advisors
        });
    } catch (error) {
        next(error);
    }
}

// Get a advisor
exports.getAdvisorById = async (req, res, next) => {
    try {
        const advisor = await AdvisorModel.findById(req.params.advisorId);
        res.status(200).json({
            success: true,
            advisor
        });
    } catch (error) {
        next(error);
    }
}

// Update a advisor
exports.updateAdvisor = async (req, res, next) => {
    try {
        const advisor = await AdvisorModel.findByIdAndUpdate(
            req.params.advisorId, req.body, { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Advisor updated successfully',
            advisor
        });
    } catch (error) {
        next(error);
    }
}

// Delete a advisor
exports.deleteAdvisor = async (req, res, next) => {
    try {
        const advisor = await AdvisorModel.findByIdAndUpdate(
            req.params.advisorId, { is_deleted: true }, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Advisor deleted successfully',
            advisor
        });
    }
    catch (error) {
        next(error);
    }
}

// Update image of a advisor
exports.updateAdvisorImage = async (req, res, next) => {
    try {
        const advisor = await AdvisorModel.findOne({ _id: req.params.advisorId, is_deleted: false });

        if (advisor.image) {
            fs.unlink("src/assets/uploads/" + advisor.image, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
            });
        }

        await AdvisorModel.findByIdAndUpdate(req.params.advisorId,
            { image: req.file.filename }, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            advisor
        });
    }
    catch (error) {
        next(error);
    }
}
