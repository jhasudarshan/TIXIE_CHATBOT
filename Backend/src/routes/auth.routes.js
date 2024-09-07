//import
import { signup, login, logout  } from '../controller/auth.controller.js'
import {validateRoute} from '../middleware/validateRoute.js';
// =======
import { Router } from "express";
const router = Router();


router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout );



// protected route (means jisko permission rahega wahi access karenge) 

// Testing Route for Middleware
// Protected Route for User
router.get("/user", validateRoute, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Access granted to user route'
    })
});

export default router;