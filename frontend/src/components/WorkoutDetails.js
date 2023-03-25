import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useContext(AuthContext);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://mern-workout-app.vercel.app/api/workouts/" + workout._id,
      {
        method: "DELETE",
        Authorization: "Bearer " + user.token,
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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="deleteBtn" onClick={handleDeleteClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
