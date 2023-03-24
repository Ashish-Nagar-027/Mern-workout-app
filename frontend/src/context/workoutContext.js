import { createContext, useReducer } from "react";

export const workoutsContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };

    default:
      return state;
  }
};

export const workoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  dispatch({});

  return (
    <workoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </workoutsContext.Provider>
  );
};
