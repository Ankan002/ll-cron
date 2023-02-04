require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db")
const userRouter = require("./routes/userRoutes");
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


connectToDB();
app.use("/", userRouter)


module.exports = app;
