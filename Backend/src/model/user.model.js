import mongoose from "mongoose";

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


const User = mongoose.model("User", userSchema);

export default User;