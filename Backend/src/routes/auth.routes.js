<<<<<<< HEAD
import express from 'express';
const router = express.Router();


//import
const {login} = require("../controller/auth.controller");
const {signup} = require("../controller/auth.controller");
const {auth ,isUser } = require("../middleware/auth.middleware");
=======
import { Router } from "express";

const router = Router();


//import
import 
const {login} = require("../controller/Auth");
const {signup} = require("../controller/Auth");
const {auth ,isStudent, isAdmin} = require("../middlewares/auth");
>>>>>>> 3c937e3100716448b2422a71333a1b69d0ceda3a


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


export default router;