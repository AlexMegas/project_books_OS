const Book = require('../models/bookSchema.js');

exports.getBooks = (req, res) => {
    Book.find({})
        .then(book => {
            throw new Error('my error:-)');
            res.json({
                book
            })
        })
        .catch(
            err => {
                console.log(err)
                res.status(404).send(err.message)
            }
        );
};

exports.addBook = (req, res) => {
    const book = new Book(req.body);
    book.save()
        .then(result => {
            res.json({
                book: result
            });
        });
};