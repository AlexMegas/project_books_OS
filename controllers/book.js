const Book = require('../models/bookSchema.js');


// exports.deleteBookById = (req, res) => {
//     const book = new Book(req.id);
//     book.findOneAndDelete(id)     // find book by id and delete
//         .then(result => {
//             res.json({
//                 book: result
//             });
//         });
// }


// exports.upddateBookById = (req, res) => {
//     const book = new Book(req.id);
//     book.findOneAndUpdate({"_id": id}, (req.body)=> {})     // update book parametres by id = findByIdAndUpdate
//         .then(result => {
//             res.json({
//                 book: result
//             });
//         });
// }

exports.getBookByAuthor = (req, res) => {
    Book.findOne()    // find book by Author  { "author": author } req.params
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

exports.getBookById = (req, res) => {
    const bookId = req.params.id;
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

exports.addBook = (req, res) => {
    const book = new Book(req.body);
    book.save()     // save new book to the book store
        .then(result => {
            res.json({
                book: result
            });
        });
};