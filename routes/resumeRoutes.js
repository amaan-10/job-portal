import express from "express";
import {
  getResumeController,
  ResumeController,
} from "./../controllers/resumeController.js";
import multer from "multer";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), userAuth, ResumeController);
router.get("/file/:id", userAuth, getResumeController);

export default router;
