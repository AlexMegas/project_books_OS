const express = require('express');
const {
    addBook,
    getBooks,
    getBookById,
    getBookByAuthor,
    updateBookById,
    deleteBookById
} = require('../controllers/book.js');

const book = express.Router();

book.post('/books', addBook); // record new book
// book.get('/books/:id', getBookById); // select one book by its id
// book.get('/books?', getBookByAuthor); // select book by author '/books/:author?'; POSTMAN= GET: http://localhost:8080/api/books?author=Author4
book.get('/books', getBooks); // select all books
book.patch('/books/:id', updateBookById); // update book parametres by id
book.delete('/books/:id', deleteBookById); // delete book by id


module.exports = book;