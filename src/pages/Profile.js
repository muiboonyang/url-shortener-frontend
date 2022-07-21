import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../context/login-context";

// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import styles from "./Profile.module.css";
import LoadingSpinner from "../components/LoadingSpinner";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
  const loginContext = useContext(LoginContext);
  const { user } = loginContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //================
  // Fetch user data from API (by specific username)
  //================

  const url = `https://url-shortener-sg.herokuapp.com/users/${user}`;

  const getUserInfo = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUsername(data.username);
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

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
        setName("");
        // loginContext.setLoggedIn(false);
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
                  id="outlined"
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
