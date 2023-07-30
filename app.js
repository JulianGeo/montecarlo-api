import dotenv from "dotenv";
import express from "express";
import cors from "cors";
const app = express();
import { dbConnect } from "./config/mongo.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//app.use("/api/1.0", require("./app/routes"));

dbConnect();
app.listen(PORT, () => {
  console.log("API listening on port:", PORT);
});
