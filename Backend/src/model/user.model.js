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
        lowercase: true,
        validate: {
            validator: function (email) {
                // Regular expression to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    PhoneNumber: {
        type: String,
        unique: true,
        require: true,
        validate: {
            validator: function (phoneNumber) {
                // Regular expression to validate phone number format
                // This example expects a 10-digit number (e.g., for US numbers without country code)
                return /^\d{10}$/.test(phoneNumber);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    bookings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking' 
    }]
});


const User = mongoose.model("User", userSchema);

export default User;