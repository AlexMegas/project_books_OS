const express = require('express');
const {
    addBook,
    getBookById,
    getBookByQuery,
    updateBookById,
    deleteBookById
} = require('../controllers/book.js');

const book = express.Router();

book.post('/books', addBook); // record new book
book.get('/books', getBookByQuery); // select book by title or all; POSTMAN= GET: http://localhost:8080/api/books?title=Title5
book.get('/books/:id', getBookById); // select one book by its id
book.patch('/books/:id', updateBookById); // update book parametres by id
book.delete('/books/:id', deleteBookById); // delete book by id

module.exports = book;