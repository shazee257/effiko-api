const router = require('express').Router();

const {
    createArticle, getAllArticles, getArticleById,
    updateArticle, deleteArticle
} = require('../controllers/article');

// Create a new article
router.post('/', createArticle);

// Get a article
router.get('/:articleId', getArticleById);

// Get all articles
router.get('/', getAllArticles);

// Update a article
router.put('/:articleId', updateArticle);

// Delete a article
router.delete('/:articleId', deleteArticle);

module.exports = router;