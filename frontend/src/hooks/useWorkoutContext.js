// custom hook component

import { WorkoutsContext } from "../context/WorkoutContext";

import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "use WorkoutContext hook must be used inside an workoutsContextProvider"
    );
  }

  return context;
};
