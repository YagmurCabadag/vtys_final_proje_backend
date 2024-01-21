const express = require("express");
const AuthController = require("../controllers/Auth.controller");

const authRouter = express.Router();

authRouter.route("/login").post(AuthController.login);
authRouter.route("/register").post(AuthController.register);
authRouter.route("/logout").post(AuthController.logout);
authRouter.route("/me").get(AuthController.getMe);
authRouter.route("/all").get(AuthController.getAllUsers);

module.exports.authRouter = authRouter;
