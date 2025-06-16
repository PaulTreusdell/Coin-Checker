import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.js";
const router = express.Router();

//Login
router.post("/login", handleLogin)

//Register
router.post("/register", handleRegister)

export default router;