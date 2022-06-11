const ArticleModel = require('../models/article');

// Create a new article
exports.createArticle = async (req, res, next) => {
    try {
        const article = await ArticleModel.create(req.body);
        res.status(200).json({
            success: true,
            article
        });
    }
    catch (error) {
        next(error);
    }
}

// Get All Articles
exports.getAllArticles = async (req, res, next) => {
    try {
        const articles = await ArticleModel.find({ is_deleted: false });
        res.status(200).json({
            success: true,
            articles
        });
    }
    catch (error) {
        next(error);
    }
}

// Get Article By Id
exports.getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.articleId);
        res.status(200).json({
            success: true,
            article
        });
    }
    catch (error) {
        next(error);
    }
}

// Update Article
exports.updateArticle = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndUpdate(
            req.params.articleId, req.body, { new: true }
        );
        res.status(200).json({
            success: true,
            article
        });
    }
    catch (error) {
        next(error);
    }
}

// Delete Article
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndUpdate(
            req.params.articleId, { is_deleted: true }, { new: true }
        );
        res.status(200).json({
            success: true,
            article
        });
    }
    catch (error) {
        next(error);
    }
}
