import { signupController,loginController,checkAuth,logOutController } from "../controllers/auth.controllers.js";
import {protectRoute} from "../../middleware/auth.middleware.js"

import express from 'express'

const router=express.Router();

router.post('/SignUp',signupController)
router.post('/LogIn',loginController)
router.post('/LogOut',protectRoute,logOutController)
router.get("/check" ,protectRoute,checkAuth)


export default router;