// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config();


// next ka use isliye karte hai ki agar ye wala middleware nhi hua toh next middleware ko check karega
// check authentication
exports.auth = (req, res, next) => {
    
    try {
        //const token = req.body.token;
        // OR alternate ways to fetch token
        const token = req.cookies.token;
        // const token = req.header("Authorization").replace("Bearer ","");   //(it s the best way)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decode)   //ye token ka data dega

            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

// check authorization
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for students you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for Admins,you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}