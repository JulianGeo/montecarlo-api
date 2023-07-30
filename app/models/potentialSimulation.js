import mongoose from "mongoose";

/**
 * Objeto del modelo de usuarios
 */
const potentialSimulationSchema = mongoose.Schema(
  {
    phie_average: { type: Number, required: true },
    phie_desvest: { type: Number, required: true },
    h_min: { type: Number, required: true },
    h_med: { type: Number, required: true },
    h_max: { type: Number, required: true },
    area: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("potentialSimulation", potentialSimulationSchema);
