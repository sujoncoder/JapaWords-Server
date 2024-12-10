import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    Credential: true
}));


// ROOT ROUTE
app.get("/hello", (req, res) => {
    res.status(200).json({ success: true, message: "Yeah server is working." })
});

// APPLICATION ROUTE


// HANDLE CLIENT ROUTE
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found !"
    })
});

export default app;

