const express = require('express');
const { getAllAdmins, getAdmin, updateAdmin, deleteAdmin } = require('../controller/admin.controller');
const Admin = require("../model/admin.model");

const routes = express.Router();


routes.get("/view-admins", getAllAdmins);
routes.get("/single-admin/:id", getAdmin);

routes.put("/update-admin/:id", Admin.uploadImage, updateAdmin);
routes.delete("/delete-admin/:id", deleteAdmin);



module.exports = routes;