import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../context/login-context";
import LoadingSpinner from "../components/LoadingSpinner";

import styles from "./Profile.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
  const loginContext = useContext(LoginContext);
  const { user, renderCount } = loginContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //================
  // Fetch user data from API (by specific username)
  //================

  const url = `https://url-shortener-sg.herokuapp.com/users/${user}`;

  const getUserInfo = async () => {
    loginContext.setIsLoading(true);
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
    loginContext.setIsLoading(false);
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
        `https://url-shortener-sg.herokuapp.com/users/${user}/update`,
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
        loginContext.setProfileName(name);
        getUserInfo();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        {loginContext.isLoading ? (
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

              <Box component="form" onSubmit={handleSubmit}>
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
                />
                <br /> <br />
                <TextField
                  required
                  fullWidth
                  id="outlined-password-input2"
                  label="Confirm Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <br /> <br />
                <hr />
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
                <br /> <br />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
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
