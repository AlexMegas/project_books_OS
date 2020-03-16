const express = require('express');
const { getBooks, addBook } = require('../controllers/book.js');

const book = express.Router();

book.post('/books', addBook);
book.get('/books', getBooks);

module.exports = book;