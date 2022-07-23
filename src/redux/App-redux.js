import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store";

const Auth = () => {
  // Pointer to function whatever you are going to do (userActions -> login function)
  // Just like reducer, dont have to pass in state, just have to pass in payload ("username")
  const dispatch = useDispatch();

  // 2 lines below you need for redux to work, causes it to re-render
  // if useSelector detects a change, only causes this component to re-render
  const storeAuth = useSelector((state) => state.auth);
  const storeUsername = useSelector((state) => state.username);

  const [username, setUsername] = useState("");

  const loginUser = () => {
    dispatch(userActions.login(username));
  };

  const logoutUser = () => {
    dispatch(userActions.logout());
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="username">Username</label>
        </div>
        <div className="col-md-8">
          <input
            id="username"
            type="text"
            onChange={handleUsernameChange}
          ></input>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <button onClick={loginUser} type="submit">
            Login
          </button>
          <button onClick={logoutUser} type="submit">
            Logout
          </button>
        </div>
        {storeAuth ? "logged in" : "logged out"}
        <br />
        {storeUsername}
      </div>
    </div>
  );
};

export default Auth;
