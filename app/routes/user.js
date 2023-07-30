import express from "express";
import { signin, signup } from "../controllers/user.js";
import { validateSignIn, validateSignUp } from "../validators/user.js";

const router = express.Router();

router.post("/signin", validateSignIn, signin);
router.post("/signup", validateSignUp, signup);

export default router;
