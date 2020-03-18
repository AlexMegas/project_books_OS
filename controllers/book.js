const Book = require('../models/bookSchema.js');


exports.addBook = (req, res) => {
    const book = new Book(req.body);
    book.save() // save new book to the book store
        .then(result => {
            res.json({
                book: result
            });
        });
};
// ------------------------------------------------------


exports.getBooks = (req, res) => {
    Book.find({}) // find all books in the book store
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
    const bookAuthor = req.query.author; //req.query: directly access the parsed query string parameters
    Book.find({
            author: bookAuthor
        }) // find book by Author
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
    Book.findByIdAndUpdate(bookId, req.body, (error, result) => { // update book parametres by id = findByIdAndUpdate
            if (error) return res.send(error);
            res.send(`Record with id:${bookId} --> updated successfully!`);
        })
        .then();
}
// ------------------------------------------------------


exports.deleteBookById = (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    res.send('-----', bookId);
    Book.findOneAndDelete({ // find book by id and delete
            _id: bookId
        }, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            console.log(`Record with id:${bookId} --> deleted from DB!`);
            return res.status(200).send();
        })
        .then(function () {});
};