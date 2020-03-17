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
    Book.findOne(req.author)    // find book by Author  { "author": author }
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
    Book.findById(req.id) // find book by id, maybe to use callbak function ?
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