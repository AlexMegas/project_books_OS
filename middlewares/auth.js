const User = require('../models/userSchema.js');
const Book = require('../models/bookSchema.js');


const checkToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: 'Token not provided!'
        })
    }
    User.findOne({
            token: token
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'Invalid token!'
                })
            }
            req.userId = user._id;
            return next();
        })
        .catch(err => res.status(500).json({
            message: 'Server error'
        }));
};


const permisUpdDel = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided!'
        })
    }
    User.findOne({
            token: token
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'Invalid token!'
                })
            }
            return user._id;
        })
        .then((userId) => {
            Book.findById(req.params.id)
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
                        res.status(401).json({
                            message: 'Permission denied'
                        })
                    }
                    return next()
                })
                .catch(err => res.status(500).json({
                    message: 'Invalid book id'
                }))
        })
        .catch((err) => res.status(500).json({
            message: 'Server error'
        }))
};


module.exports = {
    checkToken,
    permisUpdDel
}