import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkOuts = async () => {
      const response = await fetch(
        "https://mern-workout-app.vercel.app/api/workouts",
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkOuts();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="wokrouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
