import app from "./app.js";
import connectDB from "./config/db.js"
import { PORT } from "./config/constants.js";


app.listen(PORT, async () => {
    console.log(`Srver is running on ${PORT}`);
    await connectDB();
});