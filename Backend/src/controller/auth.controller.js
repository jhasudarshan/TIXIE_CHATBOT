import bcrypt from 'bcrypt';
import User from '../model/user.model.js'
import jwt from 'jsonwebtoken';
import generateAccessTokenAndSetCookie from '../utils/generateTokenSaveCookie.js';

// Sign up route handler
const signup = async (req, res) => {
    // get data
    const { name, email, password } = req.body;
    try {

        // check if user already exist 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                // success: false,
                message: 'User already exists. Please log in instead.'
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, 
        });

        // Save the new user in the database
        if(newUser){
            generateAccessTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.name,
            });
        }else{
            res.status(400).json({error: "Invalid User Data"});
        }
    }
    catch (err) {
        console.error("Error in signup Controller", error.message);
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}



// Login
const login = async (req,res) => {
    const {email,password} = req.body;
    try
    {
        // if email/password is empty
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message : "Please enter valid Email or Password",
            })
        }

        // check for register user 
        let user = await User.findOne({email});
        if(!user)
        {
            // if not a registered user
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
        }

        if(await bcrypt.compare(password,user.password)){
            // password match
            await generateAccessTokenAndSetCookie(user._id,res);

            res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password Incorrect",
            })
        }
    }
    catch(error){
        console.error("Error in signin Controller", error.message);
        return res.status(500).json({
            success : false,
            message : 'Login Faluire'
        })
    }
}

// Logout
const logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logout successful' });
};


export {
    signup,
    login,
    logout
}