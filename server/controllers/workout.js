const Workout = require("../models/workout");
const mongoose = require("mongoose");

// create workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json({ workout });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get all workouts
const getAllworkouts = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// delete single workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such workout" });
    }

    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ eror: "NO such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get single workout
const getworkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such workout" });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ eror: "NO such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// update  workout
const updateWorkOut = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such workout" });
    }

    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!workout) {
      return res.status(404).json({ eror: "NO such workout" });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getAllworkouts,
  getworkout,
  deleteWorkout,
  updateWorkOut,
};
