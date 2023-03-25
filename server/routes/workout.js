const express = require("express");
const router = express.Router();

const {
  createWorkout,
  getAllworkouts,
  getworkout,
  deleteWorkout,
  updateWorkOut,
} = require("../controllers/workout");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

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
