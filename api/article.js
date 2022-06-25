const router = require('express').Router();
const { imageUpload } = require('../utils/utils');

const {
    createArticle, getAllArticles, getArticleById,
    updateArticle, deleteArticle,
    findArticlesByCategory, updateImage
} = require('../controllers/article');

// Create a new article
router.post('/', imageUpload.single('image'), createArticle);

// Get a article
router.get('/:articleId', getArticleById);

// Get all articles
router.get('/', getAllArticles);

// Get all articles from Category id
router.get('/category/:categoryId', findArticlesByCategory);

// Update a article
router.put('/:articleId', updateArticle);

// updated image
router.put('/:articleId/image', imageUpload.single('image'), updateImage);

// Delete a article
router.delete('/:articleId', deleteArticle);

module.exports = router;