import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const workout = { title, load, reps };
    if (!title || !load || !reps) {
      return alert("please fill all fields");
    }

    const response = await fetch(
      "https://mern-workout-app.vercel.app/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setLoad("");
      setTitle("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json.workout });
    }
  };

  return (
    <form className="add-workout-form" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercize Title :</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Load (in kg) :</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <label>Reps :</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
