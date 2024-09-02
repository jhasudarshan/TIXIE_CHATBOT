import { Router } from "express";

const router = Router();


//import
import 
const {login} = require("../controller/Auth");
const {signup} = require("../controller/Auth");
const {auth ,isStudent, isAdmin} = require("../middlewares/auth");


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


// Protected Route for Student
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Student"
    })
});

// Protected Route for Student
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Protected Route for Admin"
    })
});


export default router;