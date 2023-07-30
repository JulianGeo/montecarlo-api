import express from "express";
import { simulatePotential } from "../controllers/simulator.js";
import auth from "../middleware/auth.js";
import { inputPotentialValidator } from "../validators/potentialSimulation.js";

const router = express.Router();

router.post("/potential", auth, inputPotentialValidator, simulatePotential);

export default router;
