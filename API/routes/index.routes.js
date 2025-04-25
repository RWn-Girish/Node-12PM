const express = require('express');
const Admin = require('../model/admin.model');
const { registerAdmin, loginAdmin } = require('../controller/auth.controller');

const routes = express.Router();

routes.post("/register", Admin.uploadImage, registerAdmin)
routes.post("/login", loginAdmin)

routes.use("/admin", require("./admin.routes"));


module.exports = routes;