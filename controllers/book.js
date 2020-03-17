const Book = require('../models/bookSchema.js');


exports.addBook = (req, res) => {
    const book = new Book(req.body);
    book.save()     // save new book to the book store
        .then(result => {
            res.json({
                book: result
            });
        });
};
// ------------------------------------------------------


exports.getBooks = (req, res) => {
    Book.find({})   // find all books in the book store
        .then(book => {
            //throw new Error('my error :-(');
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
// ------------------------------------------------------


exports.getBookById = (req, res) => {
    const bookId = req.params.id; //req.params: directly access the parsed route parameters from the path
    Book.findById(bookId) // find book by id
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
// ------------------------------------------------------


exports.getBookByAuthor = (req, res) => {
    const bookAuthor = req.query.author;  //req.query: directly access the parsed query string parameters
    Book.find({ author: bookAuthor })    // find book by Author
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
// ------------------------------------------------------


exports.updateBookById = (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndUpdate(bookId, req.body)     // update book parametres by id = findByIdAndUpdate
        .then(result => {
            res.json({
                book: result
            });
        });
}
// ------------------------------------------------------


exports.deleteBookById = (req, res) => {
    const bookId = req.params.id;
    Book.findOneAndDelete(bookId)     // find book by id and delete
        .then(result => {
            res.json({
                book: result
            });
        });
}