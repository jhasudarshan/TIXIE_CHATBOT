const bcrypt = require("bcrypt");
const User = require("../model/User");

// import jwt token
const jwt = require("jsonwebtoken");


require("dotenv").config();


// Sign up route handler
exports.signup = async (req, res) => {
    try {
        // get data
        const { name, email, password, role } = req.body;

        // check if user already exist 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }

        // Secured password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        // Create Entry for User
        let user = await User.create({
            name,email,password:hashedPassword,role
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
exports.login = async (req,res) => {
    try
    {
        const {email,password} = req.body;
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