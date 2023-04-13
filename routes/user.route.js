const express = require('express');
const AuthController = require("../controller/auth.controller");

const Router = express.Router();

Router.route("/signup").post(AuthController.signup);
Router.route("/login").post(AuthController.login);
Router.route("/verify").post(AuthController.verifyOtp);
Router.route("/resend-otp").post(AuthController.resendOtp);

module.exports = Router;