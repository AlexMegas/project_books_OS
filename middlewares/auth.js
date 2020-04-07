const Book = require('../models/bookSchema.js');
const jwt = require('jsonwebtoken');


const checkToken = (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY);
        req.userId = user._id;
        return next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentication failed!'
        });
    }
};


const checkIfOwner = (req, res, next) => {
    const bookId = req.params.id;
    const userId = req.userId;
    Book.findById(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    message: 'Book not found...'
                })
            }
            return book.owner;
        })
        .then((bookOwner) => {
            if (!bookOwner) {
                return res.status(404).json({
                    message: 'Book not found'
                })
            }
            if (bookOwner.toString() !== userId.toString()) {
                return res.status(401).json({
                    message: 'Permission denied'
                })
            }
            return next()
        })
        .catch(err => res.status(500).json({
            message: 'Invalid book id'
        }))
};


module.exports = {
    checkToken,
    checkIfOwner
}