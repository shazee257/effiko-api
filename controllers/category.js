const CategoryModel = require('../models/category');
const fetchCategories = require('../utils/utils');

// function to fetch sub categories (recursive)
function fetchSubCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    if (parentId == null) {
        category = categories.filter((cat) => cat.parent_id == undefined);
    } else {
        category = categories.filter((cat) => cat.parent_id == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            children: fetchSubCategories(categories, cate._id)
        })
    }
    return categoryList;
}

// create a new category
exports.createCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.create(req.body);
        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        next(error);
    }
};

// Get all categories
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find({ is_deleted: false });
        const categoryList = fetchSubCategories(categories);
        res.status(200).json({
            success: true,
            categoryList,
        });
    } catch (error) {
        next(error);
    }
}

// Function to fetch Sub-Categories from Category Id
function fetchSubCategoriesFromParentId(categories, parentId) {
    const categoryList = [];
    let category;

    category = categories.filter((cat) => cat.parent_id == parentId);

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            children: fetchSubCategoriesFromParentId(categories, cate._id)
        })
    }
    return categoryList;
}

// Get a category
exports.getCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findOne({ _id: req.params.categoryId, is_deleted: false });
        const categories = await CategoryModel.find({ is_deleted: false });
        const subCategories = fetchSubCategoriesFromParentId(categories, req.params.categoryId);

        let categoryList = [];
        if (category) {
            categoryList = [{
                _id: category._id,
                name: category.name,
                children: subCategories
            }];
        }

        res.status(200).json({
            success: true,
            categoryList
        });
    } catch (error) {
        next(error);
    }
}

// Delete a category
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.categoryId,
            { is_deleted: true }, { new: true }
        );

        res.status(200).json({
            success: true,
            category,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

// Update a category
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(req.params.categoryId,
            req.body, { new: true }
        );
        res.status(200).json({
            success: true,
            category,
            message: 'Category updated successfully'
        });
    } catch (error) {
        next(error);
    }
}
