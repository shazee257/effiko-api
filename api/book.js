const router = require('express').Router();
const { imageUpload, cvUpload } = require('../utils/utils');
const {
    createBook, uploadPdf,
    getBook, getBooks,
    deleteBook
} = require('../controllers/book');

// Create a book
router.post('/',
    imageUpload.single('image'), createBook);

// Upload a pdf book
router.post('/:bookId/upload', cvUpload.single('pdf'), uploadPdf);

// Get a book
router.get('/:bookId', getBook);

// Get all books
router.get('/', getBooks);

// Delete a book
router.delete('/:bookId', deleteBook);


module.exports = router;