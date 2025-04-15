const express = require('express');
const { addProductPage, addNewProduct, getAllProducts, getProduct } = require('../controller/product.controller');
const Product = require("../models/product.model");

const routes = express.Router();

routes.get("/add-product", addProductPage);
routes.post("/add-product", Product.uploadImage, addNewProduct);
routes.get("/view-product", getAllProducts);
routes.get("/single-product/:id", getProduct);


module.exports = routes;