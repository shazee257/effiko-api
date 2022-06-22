const CourseModel = require('../models/course');
const fs = require('fs');

// create a new course
exports.createCourse = async (req, res, next) => {
    try {
        const course = await CourseModel.create({
            title: req.body.title,
            image: req.file.filename,
            description: req.body.description,
        });

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        next(error);
    }
};

// Get a course
exports.getCourseById = async (req, res, next) => {
    try {
        const course = await CourseModel.findById(req.params.courseId);
        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        next(error);
    }
}

// Get all courses
exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await CourseModel.find({ is_deleted: false })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        next(error);
    }
}

// Update a course
exports.updateCourse = async (req, res, next) => {
    try {
        const course = await CourseModel.findByIdAndUpdate(req.params.courseId,
            req.body, { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        next(error);
    }
}

// Delete a course
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await CourseModel.findByIdAndUpdate(req.params.courseId,
            { is_deleted: true }, { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            course
        });
    }
    catch (error) {
        next(error);
    }
}

// Update image
exports.updateCourseImage = async (req, res, next) => {
    try {
        const course = await CourseModel.findOne({ _id: req.params.courseId, is_deleted: false });

        // if (course.image) {
        //     fs.unlink("src/assets/uploads/" + course.image, (err) => {
        //         if (err) throw err;
        //         console.log('successfully deleted');
        //     });
        // }

        await CourseModel.findByIdAndUpdate(req.params.courseId,
            { image: req.file.filename }, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            course
        });
    }
    catch (error) {
        next(error);
    }
}