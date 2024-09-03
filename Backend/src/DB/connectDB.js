import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const resp = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Database connected`);
    } catch (error) {
        console.log(`Connection failed:`,error);
    }
}

export default connectDB;