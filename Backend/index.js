import app from "./app.js";
import connectDB from "./src/DB/connectDB.js";

const PORT = process.env.PORT || 5000;


app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());


import { connectDB } from './src/DB/connectDB';
connectDB();



// route import
import user from "./src/routes/auth.routes.js";
// mount
app.use("/api/v1", user);

// activate server
app.listen(PORT, async() => {
    //await connectDB();
    console.log(`Server is running at ${PORT}`);
});