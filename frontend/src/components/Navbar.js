import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { dispatch: workoutDispatch } = useContext(WorkoutsContext);

  const logoutFunction = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WorkOut Buddy</h1>
        </Link>
        {user ? (
          <div className="nav-right">
            <span>{user.email}</span>
            <button onClick={logoutFunction}>LogOut</button>
          </div>
        ) : (
          <div className="nav-right">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
