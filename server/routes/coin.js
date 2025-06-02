import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createCoin } from "../controllers/coin.js";
const router = express.Router();

router.post("/", verifyToken, createCoin);

export default router;