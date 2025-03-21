const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    productImg: {
        type: String
    }
});

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads") )
    },
    filename: (req, file, cb) => {
        cb (null, `productImage-${Date.now()}`)
    }
})

bookSchema.statics.uploadImage = multer({
    storage : storageImage
}).single('productImg')


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;