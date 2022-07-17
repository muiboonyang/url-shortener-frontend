import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../context/login-context";

import Alert from "react-bootstrap/Alert";
import styles from "./Login.module.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const loginContext = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/sessions/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setSuccessMessage("Log in successful!");
        loginContext.setLoggedIn(true);
        loginContext.setUser(data.username);
        loginContext.setProfileName(data.name);
        setShowMessage(true);
        setUsername("");
        setPassword("");
      } else {
        setFailureMessage("Log in unsuccessful!");
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        {successMessage ? <Navigate to="/" /> : null}
        {failureMessage && showMessage ? (
          <Alert
            variant="danger"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            {failureMessage}
          </Alert>
        ) : null}
      </div>

      <br />

      <div className={styles.login}>
        <h3>Log In</h3>
        <br />

        <Box component="form" onSubmit={handleSubmit} data-testid="form">
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br /> <br />
          <TextField
            required
            fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br /> <br />
          <Button variant="contained" type="submit" size="large" fullWidth>
            Submit
          </Button>
          <hr />
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleRegisterRedirect}
          >
            Create Account
          </Button>
        </Box>

        <br />
      </div>
    </div>
  );
};

export default Login;
