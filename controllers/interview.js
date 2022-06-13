const InterviewModel = require('../models/interview');

// Create a interview
exports.createInterview = async (req, res, next) => {
    try {
        const newInterview = await InterviewModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Interview created successfully",
            newInterview
        });
    }
    catch (error) {
        next(error);
    }
}

// Get all interviews
exports.getAllInterviews = async (req, res, next) => {
    try {
        const interviews = await InterviewModel.find({ is_deleted: false });
        res.status(200).json({
            success: true,
            message: "All interviews fetched successfully",
            interviews
        });
    }
    catch (error) {
        next(error);
    }
}

// Update a interview
exports.updateInterview = async (req, res, next) => {
    try {
        const interview = await InterviewModel.findByIdAndUpdate(
            req.params.interviewId,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Interview updated successfully",
            interview
        });
    }
    catch (error) {
        next(error);
    }
}

// Delete a interview
exports.deleteInterview = async (req, res, next) => {
    try {
        const interview = await InterviewModel.findByIdAndUpdate(
            req.params.interviewId,
            { is_deleted: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Interview deleted successfully",
            interview
        });
    }
    catch (error) {
        next(error);
    }
}