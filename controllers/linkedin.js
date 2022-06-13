const LinkedinModel = require('../models/linkedin');

// create a new linkedin data
exports.createLinkedin = async (req, res, next) => {
    try {
        const linkedin = await LinkedinModel.create({
            user_name: req.body.user_name,
            linkedin_email: req.body.linkedin_email,
            cv: req.file.filename
        });

        res.status(200).json({
            success: true,
            linkedin
        });
    } catch (error) {
        next(error);
    }
};

// get all linkedin data
exports.getAllLinkedin = async (req, res, next) => {
    try {
        const linkedin = await LinkedinModel.find({});

        res.status(200).json({
            success: true,
            linkedin
        });
    } catch (error) {
        next(error);
    }
}

// Delete a linkedin data
exports.deleteLinkedin = async (req, res, next) => {
    try {
        const linkedin = await LinkedinModel.findByIdAndUpdate(
            req.params.linkedinId,
            { is_deleted: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "linkedin data deleted successfully",
            linkedin
        });
    } catch (error) {
        next(error);
    }
}
