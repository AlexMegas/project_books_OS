const Book = require('../models/bookSchema.js');

// add new book
exports.addBook = (req, res) => {
    const {
        author,
        title,
        public,
        pages,
        genre
    } = req.body;
    const book = new Book({
        author,
        title,
        public,
        pages,
        genre,
        owner: req.userId
    });
    book.save()
        .then(book => res.json({
            book: book
        }))
        .catch(err => res.status(500).json({
            message: 'Record error'
        }))
};

// find book by id
exports.getBookById = (req, res) => {
    const bookId = req.params.id; //req.params: directly access the parsed route parameters from the path
    Book.findById(bookId)
        .then(book => {
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

// find all books in the book store
// find book by query = title
exports.getBookByQuery = (req, res) => {
    const title = req.query.title; //req.query: directly access the parsed query string parameters
    if (!title) {
        Book.find({})
            .then(books => {
                res.json({
                    books
                })
            })
            .catch(
                err => {
                    console.log(err)
                    res.status(404).send(err.message)
                }
            );
    } else {
        Book.find({
                title: title
            })
            .then(book => {
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
    }
};


exports.updateBookById = (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndUpdate(bookId, req.body, {
            new: true
        })
        .then(book => {
            res.status(200).json({
                book
            })
        })
        .catch(
            err => {
                res.status(404).json({
                    message: 'Server error'
                })
            });
};


// find book by id and delete
exports.deleteBookById = (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId) //findOneAndDelete
        .then(book => {
            res.status(200).json({
                message: `Book deleted: ${book.title}`
            })
        })
        .catch(err => res.status(500).send());
}