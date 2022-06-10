const BrandModel = require('../models/brand');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// create a new brand
exports.createBrand = async (req, res, next) => {
    try {
        const brand = await BrandModel.create(req.body);
        res.status(200).json({
            success: true,
            brand
        });
    } catch (error) {
        next(error);
    }
};

// upload image and update (delete image file if exists)
exports.uploadImage = async (req, res, next) => {
    if (req.file) {
        if (req.fileValidationError) {
            return res.status(400).json({
                status: 400, message: req.fileValidationError,
            });
        }

        try {
            const brand = await BrandModel.findOne({ _id: req.params.brandId, is_deleted: false });

            if (brand.image) {
                fs.unlink("src/assets/uploads/" + brand.image, (err) => {
                    if (err) throw err;
                    console.log('successfully deleted');
                });
            }

            await BrandModel.findOneAndUpdate(
                { _id: req.params.brandId, is_deleted: false },
                { image: req.file.filename }
            );

        } catch (error) {
            next(error);
        }

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
        });
    }

    return res.status(400).json({
        status: 400,
        message: "Please upload file.",
    });
}

// get a brand
exports.getBrandById = async (req, res, next) => {
    try {
        const brand = await BrandModel.findById(req.params.brandId);
        res.status(200).json({
            success: true,
            brand
        });
    } catch (error) {
        next(error);
    }
}

// get all brands
exports.getAllBrands = async (req, res, next) => {
    try {
        const brands = await BrandModel.find({ is_deleted: false });
        res.status(200).json({
            success: true,
            brands
        });
    } catch (error) {
        next(error);
    }
}

// update a brand
exports.updateBrand = async (req, res, next) => {
    try {
        const brand = await BrandModel.findByIdAndUpdate(req.params.brandId,
            req.body, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Brand updated successfully',
            brand
        });
    } catch (error) {
        next(error);
    }
}

// delete a brand (soft delete)
exports.deleteBrand = async (req, res, next) => {
    try {
        await BrandModel.findByIdAndUpdate(req.params.brandId, { is_deleted: true });
        res.status(200).json({
            success: true,
            message: 'Brand deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

