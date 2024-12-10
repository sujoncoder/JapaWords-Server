import mongoose from "mongoose";

import { DB_URI } from "./constants.js";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(DB_URI);
        if (db) {
            console.log("Database connection successfull 😎")
        } else {
            console.log("Failed to database connection 🔥")
        };
    } catch (error) {
        console.log("Error in the database: ", error.message)
    }
};

export default connectDB;