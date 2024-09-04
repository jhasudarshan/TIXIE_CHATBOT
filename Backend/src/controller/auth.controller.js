import bcrypt from 'bcrypt';
import User from '../model/user.model.js'
import jwt from 'jsonwebtoken';

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

        // let hashedPassword;
        // try {
        //     hashedPassword = await bcrypt.hash(password, 10);
        // }
        // catch (err) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "Error in hashing password",
        //     })
        // }

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, 
        });

        // Save the new user in the database
        await newUser.save();


        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            success : true,
            message : "User Created Successfully",
            //data : user
        });


    }
    catch (err) {
        console.error(err)
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

        // Verify password & generate a JWT token
        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };


        if(await bcrypt.compare(password,user.password)){
            // password match

            // creating jwt token
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",
            }); 

            user = user.toObject();    // user ko object main convert kr raha hai
            user.token = token;
            user.password = undefined;    // undefined nhi karenge toh sb koii apna password dekh lega


            // creating cookies
            const options = {        // it means 3 din (expire time) = (3 * 24 * 60 * 60 * 1000)ms....we can change the expire time of cookies
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message:"User logged in successfully"
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
    catch(err){
        console.error(err)
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