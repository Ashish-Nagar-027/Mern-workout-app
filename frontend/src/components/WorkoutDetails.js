import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.title}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
    </div>
  );
};

export default WorkoutDetails;
