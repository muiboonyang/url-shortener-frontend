import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";
import { update } from "../redux/userSlice";

import styles from "./Profile.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
  // Imports the 'isLoading' state from 'loading' slice
  const isLoading = useSelector((state) => state.loading.isLoading);
  const storeUsername = useSelector((state) => state.user.username);
  const renderCount = useSelector((state) => state.render.renderCount);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match!");
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (password === passwordConfirm && errorMessage) {
      setErrorMessage("");
    }
  }, [password, passwordConfirm, errorMessage]);

  //================
  // Fetch user data from API (by specific username)
  //================

  const url = `https://url-shortener-sg.herokuapp.com/users/${storeUsername}`;

  const getUserInfo = async () => {
    dispatch(loadingStatus());
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200) {
        setUsername(data.username);
        setName(data.name);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, [renderCount]);

  //================
  // Update current user
  //================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/users/${storeUsername}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            name: name,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setPassword("");
        dispatch(update(name));
        getUserInfo();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <>
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
            <div className={styles.profile}>
              <br />
              <h3>Update Profile</h3>
              <br />
              <TextField
                required
                fullWidth
                id="outlined-name"
                label="Name"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <br />
              <hr />

              <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                <TextField
                  disabled
                  fullWidth
                  id="outlined"
                  label="Email"
                  type="email"
                  value={username}
                />
                <br /> <br />
                <TextField
                  required
                  fullWidth
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={password !== passwordConfirm}
                  helperText={errorMessage}
                />
                <br /> <br />
                <TextField
                  required
                  fullWidth
                  id="outlined-password-input2"
                  label="Confirm Password"
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  error={password !== passwordConfirm}
                  helperText={errorMessage}
                />
                <br /> <br />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ bgcolor: "black" }}
                >
                  Update
                </Button>
              </Box>
            </div>
            <br />
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
