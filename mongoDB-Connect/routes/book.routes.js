const express = require('express');
const bookRoutes = express.Router()
const { getAllBooks, addBook, deleteBook, editBook, updateBook } = require("../controller/book.controller");
const Book = require('../model/book.model');


bookRoutes.get("/", getAllBooks);

bookRoutes.post("/add-book", Book.uploadImage, addBook)

bookRoutes.get("/delete-book/:id", deleteBook);

bookRoutes.get("/edit-book/:id", editBook)

bookRoutes.post("/update-book/:id", Book.uploadImage, updateBook)


module.exports = bookRoutes;