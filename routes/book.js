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

book.post('/book/', addBook); // record new book
book.get('/books/all', getBooks); // select all books; changed to '/books/all'
book.get('/books/:id', getBookById); // select one book by its id
book.get('/books/:author?', getBookByAuthor); // select book by author '/books/:author?'
book.patch('/books/upd/:id', updateBookById); // update book parametres by id
book.delete('books/del/:id', deleteBookById); // delete book by id


module.exports = book;