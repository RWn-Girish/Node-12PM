const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,   // short hand Property
    desc: {
        type: String
    },
    category: {
        type: String
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;