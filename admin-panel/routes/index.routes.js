const express = require('express');
const routes = express.Router();
const {dashBoard, loginPage, loginAdmin} = require("../controller/index.controller");

routes.get("/", loginPage);
routes.get("/dashboard", dashBoard);

routes.post("/login", loginAdmin);

routes.use("/admin", require('./admin.routes'))


module.exports = routes;