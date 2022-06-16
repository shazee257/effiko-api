const CategoryModel = require('../models/category');

// Create a new category
exports.createCategory = async (req, res, next) => {
    // category name already exists
    const categoryExists = await CategoryModel.findOne({ name: req.body.name });
    if (categoryExists) {
        return res.status(400).json({
            success: false,
            message: 'category already exists'
        });
    }

    try {
        const category = await CategoryModel.create(req.body);
        res.status(200).json({
            success: true,
            message: 'category created successfully',
            category
        });
    }
    catch (error) {
        next(error);
    }
}

// Get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({ is_deleted: false });
        res.status(200).json({
            success: true,
            categories
        });
    }
    catch (error) {
        next(error);
    }
}

// Get a category by id
exports.getCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.categoryId);
        res.status(200).json({
            success: true,
            category
        });
    }
    catch (error) {
        next(error);
    }
}

// Update a category
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.categoryId, req.body, { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'category updated successfully',
            category
        });
    }
    catch (error) {
        next(error);
    }
}

// Delete a category
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.categoryId, { is_deleted: true }, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'category deleted successfully',
            category
        });
    }
    catch (error) {
        next(error);
    }
}
