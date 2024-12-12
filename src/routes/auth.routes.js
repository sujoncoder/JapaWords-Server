import express from "express";

import { accountVerifyOtp, register } from "../controllers/auth.controller.js";

// EXTRACT AUTH ROUTER FROM EXPRESS
const authRouter = express.Router();

// REGISTER ROUTE
authRouter.post("/register", register);
authRouter.post("/verify-otp", accountVerifyOtp);

export default authRouter;