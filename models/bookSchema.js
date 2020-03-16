const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({ // schema in DB MongoDB
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    public: {
        type: Date,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("book", bookSchema); // in mongoDB will be saved as "books"