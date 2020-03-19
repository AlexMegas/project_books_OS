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


exports.getBookByQuery = (req, res) => {
    const title = req.query.title; //req.query: directly access the parsed query string parameters
    if (!title) {
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
    } else {
        Book.find({
            title: title
        }) // find book by query = title
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
    Book.findByIdAndUpdate(bookId, req.body)
        .then(res.send(`Record with id:${bookId} --> updated successfully!`))
        .catch(
            err => {
                console.log(err)
                res.status(404).send(err.message)
            });
};


exports.deleteBookById = (req, res) => {
    const bookId = req.params.id;// find book by id and delete
    Book.findOneAndDelete({ _id: bookId })
        .then(res.send(`Record with id:${bookId} --> deleted from DB!`))
        .catch(err => {
            console.log(err);
            res.status(500).send();
        })
}