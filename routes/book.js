const express = require('express');
const { addBook, getBooks, getBookById, getBookByAuthor/*, updateBookById, deleteBookById*/ } = require('../controllers/book.js');

const book = express.Router();

book.post('/books', addBook); // record new book
book.get('/books', getBooks); // select all books
book.get('/books/id:', getBookById); // select one book by its id
book.get('/books/?author=', getBookByAuthor); // select book by author
//book.patch('/books/id:', updateBookById); // update book parametres by id
//book.delete('books/:', deleteBookById); // delete book by id


// const id = find({ name: 'name'}).then(res => {return res});
// router.get("/", #{id});


module.exports = book;