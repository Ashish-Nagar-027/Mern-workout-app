const express = require("express");
const notFound = require("./middlewares/notFound");
const cors = require("cors");

require("dotenv").config();

const workoutRouter = require("./routes/workout");

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/workouts", workoutRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<div><h1>Go to api</h1> <a href='https://mern-workout-app.vercel.app/api/workouts'>https://mern-workout-app.vercel.app/api/workouts</a></div>"
    );
});

app.use(notFound);

module.exports = app;
