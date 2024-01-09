import express from "express";
import { loginController, registerController } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})

// router object
const router = express.Router();

// routes
router.post('/register', limiter, registerController);
router.post('/login', limiter, loginController);

export default router;