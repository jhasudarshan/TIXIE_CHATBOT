import app from "./app.js";
import connectDB from "./src/DB/connectDB.js";







const PORT = process.env.PORT || 8000
app.listen(PORT, async() => {
    //await connectDB();
    console.log(`Server is running at ${PORT}`);
});