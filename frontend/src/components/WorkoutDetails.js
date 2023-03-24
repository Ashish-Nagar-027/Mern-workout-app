import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDeleteClick = async () => {
    const response = await fetch(
      "https://mern-workout-app.vercel.app/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <span className="deleteBtn" onClick={handleDeleteClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
