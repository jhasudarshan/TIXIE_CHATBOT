// const connectDB = async() => {
//     try {
//         const resp = await mongoose.connect(process.env.DATABASE_URL);
//         console.log(`Database connected`);
//     } catch (error) {
//         console.log(`Connection failed:`,error);
//     }
// }

// export default connectDB;



import mongoose from "mongoose";

dotenv.config({
    path: './backend/.env'
})

exports.connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log("Database Connection established")
    })
    .catch((err) => {
        console.error(err)
        console.log("Connection Issues with Database");
        process.exit(1);
    })
}