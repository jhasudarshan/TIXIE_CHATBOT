// auth, isStudent, isAdmin
import jwt from 'jsonwebtoken';

// next ka use isliye karte hai ki agar ye wala middleware nhi hua toh next middleware ko check karega
// check authentication
const auth = (req, res, next) => {
    
    try {
        //const token = req.body.token;
        // OR alternate ways to fetch token
        const token = req.cookies.token;
        // const token = req.header("Authorization").replace("Bearer ","");   //(it s the best way)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
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
                message: "Token is invalid"
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
const isUser = (req, res, next) => {
    try {
        if (req.user.role !== "isUser") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for user"
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



export{
    auth,
    isUser
}