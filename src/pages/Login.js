import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";
import { login } from "../redux/userSlice";

import styles from "./Login.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLoginRedirect = () => {
    navigate("/createurl");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingStatus());

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
        dispatch(login(data));
        setUsername("");
        setPassword("");
        handleLoginRedirect();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={styles.login}>
            <br />
            <h3>Log In</h3>
            <br />

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                type="email"
                autoComplete="current-email"
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
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                sx={{ bgcolor: "black" }}
              >
                Submit
              </Button>
              <hr />
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleRegisterRedirect}
                sx={{ color: "gray" }}
              >
                Create Account
              </Button>
            </Box>

            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
