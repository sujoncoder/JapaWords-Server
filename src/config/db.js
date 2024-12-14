import mongoose from "mongoose";
import { DB_URI } from "./constants.js";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing database connection.");
        return;
    };

    try {
        const db = await mongoose.connect(DB_URI);

        isConnected = !!db.connections[0].readyState;
        console.log("Database connection successful 😎");
    } catch (error) {
        console.error("Database connection error 🔥:", error.message);
    }
};

export default connectDB;