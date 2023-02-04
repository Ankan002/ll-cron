import { config as dotenvConfig } from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";
import { teamRouter } from "./routes/team-router.js";
import cors from "cors";
const app = express();

dotenvConfig();

app.use(express.json());
app.use(cors());

connectToDB();
app.use("/api/team", teamRouter);


export default app;
