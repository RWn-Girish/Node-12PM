const express = require('express');
const { extraCategoryPage } = require('../controller/extraCategory.controller');

const routes = express.Router();

routes.get("/add-extraCategory", extraCategoryPage);

module.exports = routes;