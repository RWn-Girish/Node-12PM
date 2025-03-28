const express = require('express');
const routes = express.Router();
const {dashBoard, loginPage, loginAdmin, logout, forgotPasswordPage, sendEmail, verifyOTP, changePassword} = require("../controller/index.controller");
const passport = require('passport');


routes.get("/", loginPage);
routes.get("/dashboard", passport.checkAuthenticated, dashBoard);

routes.post("/login", passport.authenticate('local',{failureRedirect: "/"} ),  loginAdmin);
routes.get("/logout", logout);
routes.get("/profile", logout);

routes.get("/forgotPassword", forgotPasswordPage);
routes.post("/sendEmail", sendEmail);
routes.post("/verify-otp", verifyOTP);
routes.post("/change-password", changePassword);

routes.use("/admin", passport.checkAuthenticated, require('./admin.routes'))


module.exports = routes;