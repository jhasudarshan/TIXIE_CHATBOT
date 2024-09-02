import express from 'express';
const router = express.Router();


//import
const {login} = require("../controller/auth.controller");
const {signup} = require("../controller/auth.controller");
const {auth ,isUser } = require("../middleware/auth.middleware");


router.post("/login",login);
router.post("/signup",signup);



// protected route (means jisko permission rahega wahi access karenge) 

// Testing Route for Middleware
router.get("/test", auth, (req,res) => {
    res.json({
        success: true,
        message: "Test successful"
    })
})


// Protected Route for User
router.get("/user", auth, isUser, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for User"
    })
});



module.exports = router;