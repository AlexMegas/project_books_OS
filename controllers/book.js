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
    const promise = new Promise(function (resolve, reject) {
        Book.findByIdAndUpdate(bookId, req.body, (error, result) => { // update book parametres by id = findByIdAndUpdate
            if (error) reject();
            resolve(result);
        })
    })
    promise.then(res.send(`Record with id:${bookId} --> updated successfully!`));
    promise.catch(
        err => {
            console.log(err)
            res.status(404).send(err.message)
        });
}



exports.deleteBookById = (req, res) => {
    const bookId = req.params.id;
    Book.findOneAndDelete({ // find book by id and delete
        _id: bookId
    }, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        res.send(`Record with id:${bookId} --> deleted from DB!`);
    });
};