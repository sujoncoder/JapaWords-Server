import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`);
    await connectDB();
});
