const express = require("express");
const notFound = require("./middlewares/notFound");
const cors = require("cors");

require("dotenv").config();

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<div><h1>Go to api</h1> <a href='https://mern-workout-app.vercel.app/api/workouts'>https://mern-workout-app.vercel.app/api/workouts</a></div>"
    );
});

app.use(notFound);

module.exports = app;
