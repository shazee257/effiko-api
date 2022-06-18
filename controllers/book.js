const BookModel = require('../models/book');

// Create a book
exports.createBook = async (req, res, next) => {
    try {
        const book = await BookModel.create({
            title: req.body.title,
            author: req.body.author,
            image: req.file.filename,
        });

        res.status(200).json({
            success: true,
            book
        });
    } catch (error) {
        next(error);
    }
}

// Upload a pdf book / Update a book
exports.uploadPdf = async (req, res, next) => {
    try {
        const book = await BookModel.findOne(
            { _id: req.params.bookId, is_deleted: false }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        book.pdf = req.file.filename;
        await book.save();
        res.status(200).json({
            success: true,
            message: 'Book uploaded'
        });
    }
    catch (error) {
        next(error);
    }
}

// Get a book
exports.getBook = async (req, res, next) => {
    try {
        const book = await BookModel.findOne(
            { _id: req.params.bookId, is_deleted: false }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            book
        });
    }
    catch (error) {
        next(error);
    }
}

// Get all books
exports.getBooks = async (req, res, next) => {
    try {
        const books = await BookModel.find({ is_deleted: false });

        res.status(200).json({
            success: true,
            books
        });
    } catch (error) {
        next(error);
    }
}

// Delete a book
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await BookModel.findByIdAndUpdate(
            req.params.bookId,
            { is_deleted: true },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Book deleted',
            book
        });
    }
    catch (error) {
        next(error);
    }
}


