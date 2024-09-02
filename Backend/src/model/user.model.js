const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Student", "Visitor"],
        // enum means aapka role(Authorization) limit mai hoga Admin or Student or Visitor
    },
});





//  by sudarshan
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
// });

// module.exports = mongoose.model('User', UserSchema);




module.exports = mongoose.model("User", userSchema);