import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/get-user", userAuth, getUserController);

router.put("/update-user", userAuth, updateUserController);

export default router;
