const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const bookSchema = new mongoose.Schema({
    // schema in DB MongoDB
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
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: "User"
    }
});

module.exports = mongoose.model("book", bookSchema);