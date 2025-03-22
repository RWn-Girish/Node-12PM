const express = require('express');
const routes = express.Router();
const {dashBoard, loginPage, loginAdmin, logout, forgotPasswordPage} = require("../controller/index.controller");

routes.get("/", loginPage);
routes.get("/dashboard", dashBoard);

routes.post("/login", loginAdmin);
routes.get("/logout", logout);
routes.get("/profile", logout);

routes.get("/forgotPassword", forgotPasswordPage)

routes.use("/admin", require('./admin.routes'))


module.exports = routes;