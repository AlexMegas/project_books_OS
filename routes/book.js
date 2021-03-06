const express = require('express');
const {
    addBook,
    getBookById,
    getBookByQuery,
    updateBookById,
    deleteBookById
} = require('../controllers/book.js');

const {
    checkToken,
    checkIfOwner
} = require('../middlewares/auth.js');

const book = express.Router();

book.post('/', checkToken, addBook); // record new book
book.get('/:id', getBookById); // select one book by its id
book.get('/', getBookByQuery); // select book by title or all
book.patch('/:id', checkToken, checkIfOwner, updateBookById); // update book parametres by id
book.delete('/:id', checkToken, checkIfOwner, deleteBookById); // delete book by id

module.exports = book;