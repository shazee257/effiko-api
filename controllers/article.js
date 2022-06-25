const ArticleModel = require('../models/article');

// Create a new article
exports.createArticle = async (req, res, next) => {
    try {
        // const article = await ArticleModel.create(req.body);
        const article = await ArticleModel.create({
            title: req.body.title,
            image: req.file.filename,
            body: req.body.body,
            category_id: req.body.category_id
        });


        res.status(200).json({
            success: true,
            message: 'Article created successfully',
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
        const articles = await ArticleModel.find({ is_deleted: false })
            .populate('category_id', 'name').sort({ createdAt: -1 });
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
        const article = await ArticleModel.findById(req.params.articleId).populate('category_id', 'name');
        res.status(200).json({
            success: true,
            article
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error
        });
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
            message: 'Article updated successfully',
            article
        });
    }
    catch (error) {
        next(error);
    }
}

// update image
exports.updateImage = async (req, res, next) => {
    try {
        // const article = await ArticleModel.findOne({ _id: req.params.articleId, is_deleted: false });

        // if (!article) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Article not found'
        //     });
        // }
        const article = await ArticleModel.findByIdAndUpdate(req.params.articleId,
            { image: req.file.filename }, { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
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

// Find articles by Category
exports.findArticlesByCategory = async (req, res, next) => {
    console.log('req params category id: ', typeof req.params.categoryId);

    const filterArticles = [];

    try {
        const articles = await ArticleModel.find({ is_deleted: false })
            .populate('category_id', 'name').sort({ createdAt: -1 });

        for (let i = 0; i < articles.length; i++) {
            if (articles[i].category_id._id.toString() == req.params.categoryId) {
                filterArticles.push(articles[i]);
            }
        }
        res.status(200).json({
            success: true,
            filterArticles
        });
    } catch (error) {
        next(error);
    }


}
