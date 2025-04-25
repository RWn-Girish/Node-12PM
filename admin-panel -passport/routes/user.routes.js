const express = require('express');
const { userPage, signleProduct, addToFavorite } = require('../controller/user.controller');

const routes = express.Router();

routes.get("/", userPage);
routes.get("/single-product/:id", signleProduct);
// routes.get("/add-favorite/:id", addToFavorite);
// routes.get("/get-favorite/", getAllFavorites);



module.exports = routes;