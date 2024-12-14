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
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}));



// ROOT ROUTE
app.get("/", (req, res) => {
    res.status(200).send("Yes server is working.")
});

app.get("/hello", (req, res) => {
    res.status(200).send("Hello developer. How are you.")
});

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
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

