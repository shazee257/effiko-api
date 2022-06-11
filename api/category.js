const router = require('express').Router();

const {
    createCategory, getAllCategories, getCategory,
    updateCategory, deleteCategory
} = require('../controllers/category');

// Add a category
router.post('/', createCategory);

// Get a category
router.get('/:categoryId', getCategory);

// Get all categories
router.get('/', getAllCategories);

// Update a category
router.put('/:categoryId', updateCategory);

// Delete a category
router.delete('/:categoryId', deleteCategory);

module.exports = router;