require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db.js");
const teamRouter = require("./routes/team-router.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

connectToDB();
app.use("/api/team", teamRouter);


module.exports = app;
