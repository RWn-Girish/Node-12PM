const express = require('express');
const { addCategoryPage, addCategory, viewCategory, deleteCategory } = require('../controller/category.controller');
const Category = require("../models/category.model");

const routes = express.Router();

routes.get("/add-category", addCategoryPage);
routes.get("/view-category", viewCategory);
routes.post("/add-category", Category.uploadImage, addCategory);

routes.get("/delete-category/:id", deleteCategory)
module.exports = routes;