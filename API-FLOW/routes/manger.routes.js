const express = require('express');
const routes = express.Router();
const uploadImage = require("../middleware/uploadImage");
const { verifyManagerToken } = require('../middleware/verifyToken');
const { loginManager, myProfile } = require('../controller/manager.controller');

routes.post("/login", loginManager);   

routes.get("/profile", verifyManagerToken, myProfile); 

// routes.post("/change-password", verifyAdminToken, changePassword);

// routes.post("/add-manager", verifyAdminToken, uploadImage.single('profileImage'), addManager)
// routes.get("/view-manager", verifyAdminToken, viewAllManager)


module.exports = routes;