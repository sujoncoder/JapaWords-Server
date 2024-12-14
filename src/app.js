import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";


// EXTRACT APP FROM EXPRESS
const app = express();


// APPLICATION MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    Credential: true
}));


// ROOT ROUTE
app.get("/", (req, res) => {
    res.status(200).send("Yes server is working.")
});

// APPLICATION ROUTE
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);


// HANDLE CLIENT ROUTE
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found !"
    })
});

export default app;

