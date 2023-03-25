import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await fetch(
      "https://mern-workout-app.vercel.app/api/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return alert("something is wrong please try again");
    }

    if (response.ok) {
      // save token in local
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button disabled={isLoading} className={isLoading ? "lading-btn" : ""}>
        {isLoading ? " wait..." : "Log In"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
