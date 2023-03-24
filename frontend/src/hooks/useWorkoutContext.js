// custom hook component

import { workoutsContext } from "../context/workoutContext";

import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(workoutsContext);

  if (!context) {
    throw Error(
      "use WorkoutContext hook must be used inside an workoutsContextProvider"
    );
  }

  return context;
};
