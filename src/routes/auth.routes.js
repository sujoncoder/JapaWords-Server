import express from "express";

import { accountVerify, register, login, sendResetPasswordOtp, resetPassword, logout, isAuthentic } from "../controllers/auth.controller.js";
import { isLoggedin } from "../middleware/auth.js";

// EXTRACT AUTH ROUTER FROM EXPRESS
const authRouter = express.Router();

// REGISTER ROUTE
authRouter.post("/register", register);
authRouter.post("/verify-otp", accountVerify);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/is-loggedin", isLoggedin, isAuthentic);

authRouter.post("/send-reset-request", sendResetPasswordOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;