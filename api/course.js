const router = require('express').Router();
const { imageUpload } = require('../utils/utils');

const {
    createCourse, getCourseById, getAllCourses,
    updateCourse, deleteCourse, updateCourseImage

} = require('../controllers/course');

// Create a new course
router.post('/', imageUpload.single('image'), createCourse);

// Get a course
router.get('/:courseId', getCourseById);

// Get all courses
router.get('/', getAllCourses);

// Update a course
router.put('/:courseId', updateCourse);

// Update image
router.put('/:courseId/image', imageUpload.single('image'), updateCourseImage);

// Delete a category
router.delete('/:courseId', deleteCourse);


module.exports = router;