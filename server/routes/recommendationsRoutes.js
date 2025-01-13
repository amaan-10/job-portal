import express from "express";
import { getRecommendations } from "../controllers/recommendationsController.js";

const router = express.Router();

router.post("/get-recommendations", getRecommendations);

export default router;
