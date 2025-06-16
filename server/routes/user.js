import express from "express"
import { verifyToken } from "../middleware/auth.js";
import { generateInfo } from "../controllers/user.js";
const router = express.Router()

router.get("/home", verifyToken, generateInfo)

export default router;