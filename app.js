import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnect } from "./config/mongo.js";
import userRoutes from "./app/routes/user.js";
import simulatorRoutes from "./app/routes/simulator.js";
import { logger } from "express-winston";
import { customLogger } from "./app/helpers/customLogger.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(
  logger({
    winstonInstance: customLogger,
    statusLevels: true,
  })
);

app.use("/api/1.0/user", userRoutes);
app.use("/api/1.0/simulator", simulatorRoutes);

dbConnect();
app.listen(PORT, () => {
  console.log("API listening on port: http://localhost:" + PORT);
});
