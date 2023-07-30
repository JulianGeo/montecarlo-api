import mongoose from "mongoose";

const simulationSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    p10: { type: Number, required: true },
    p50: { type: Number, required: true },
    p90: { type: Number, required: true },
    iterations: { type: Number, required: true },
    units: { type: String, required: true },
    id: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("simulation", simulationSchema);
