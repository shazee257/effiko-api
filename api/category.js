const router = require('express').Router();

const { isAuth } = require('../middlewares/auth');

const {
    createCategory, getAllCategories, deleteCategory, updateCategory, getCategory,

} = require('../controllers/category');
// Add a category
router.post('/', isAuth, createCategory);

// Get all categories
router.get('/', isAuth, getAllCategories);

// Delete a category
router.delete('/:categoryId', isAuth, deleteCategory);

// Update a category
router.put('/:categoryId', isAuth, updateCategory);

// Get a category
router.get('/:categoryId', isAuth, getCategory);


module.exports = router;