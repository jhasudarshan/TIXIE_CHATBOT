import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});


const User = mongoose.model("User", userSchema);

export default User;