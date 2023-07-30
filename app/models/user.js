import mongoose from "mongoose";

/**
 * Objeto del modelo de usuarios
 */
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userSchema);
