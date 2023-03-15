const express = require("express");
const {
  createWorkout,
  getAllworkouts,
  getworkout,
  deleteWorkout,
  updateWorkOut,
} = require("../controllers/workout");

const router = express.Router();

//GET all Workouts
router.get("/", getAllworkouts);

//GET a single Workout
router.get("/:id", getworkout);

//POST Workouts
router.post("/", createWorkout);

//delete  Workout
router.delete("/:id", deleteWorkout);

//patch  Workout
router.patch("/:id", updateWorkOut);

module.exports = router;
