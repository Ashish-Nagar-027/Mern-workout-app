import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useContext(AuthContext);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchWorkOuts = async () => {
      setFetching(true);
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
      setFetching(false);
    };

    fetchWorkOuts();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {fetching ? (
          <h3>loading your workouts....</h3>
        ) : workouts?.length > 0 ? (
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })
        ) : (
          <h3>You haven't added any workout yet</h3>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
