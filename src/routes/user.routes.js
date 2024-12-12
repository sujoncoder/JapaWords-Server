import express from "express";
import { getAllUser, getSingleUser } from "../controllers/user.controller.js";
import { isAdmin, isLoggedin } from "../middleware/auth.js";


// EXTRACT AUTH ROUTER FROM EXPRESS
const userRouter = express.Router();

userRouter.get("/", isLoggedin, isAdmin, getAllUser);
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedin, isAdmin, getSingleUser);


export default userRouter;