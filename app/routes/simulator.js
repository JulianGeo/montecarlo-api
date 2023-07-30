import express from "express";
import { simulatePotential } from "../controllers/simulator.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/potential", auth, simulatePotential);

export default router;
