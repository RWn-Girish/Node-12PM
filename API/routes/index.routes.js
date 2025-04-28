const express = require('express');
const Admin = require('../model/admin.model');
const { registerAdmin, loginAdmin, myProfile, changePassword } = require('../controller/auth.controller');
const tokenVerify = require('../middleware/tokenVerify');

const routes = express.Router();

routes.post("/register", Admin.uploadImage, registerAdmin)
routes.post("/login", loginAdmin)
routes.get("/profile", tokenVerify, myProfile);
routes.post("/change-password", tokenVerify, changePassword);


routes.use("/admin", tokenVerify, require("./admin.routes"));
routes.use("/product", tokenVerify, require("./admin.routes"));


module.exports = routes;