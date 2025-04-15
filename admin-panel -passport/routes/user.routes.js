const express = require('express');
const { userPage, signleProduct } = require('../controller/user.controller');

const routes = express.Router();

routes.get("/", userPage);
routes.get("/single-product/:id", signleProduct);



module.exports = routes;