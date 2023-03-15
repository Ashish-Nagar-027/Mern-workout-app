const express = require("express");

require("dotenv").config();

const workoutRouter = require("./routes/workout");

const app = express();

app.use(express.json());

//routes
app.use("/api/workouts", workoutRouter);

module.exports = app;
