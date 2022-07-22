import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/login-context";
import LoadingSpinner from "../components/LoadingSpinner";

import styles from "./CreateAccount.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateAccount = () => {
  const loginContext = useContext(LoginContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginContext.setIsLoading(true);

    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/users/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            name: name,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setUsername("");
        setPassword("");
        setName("");
        handleLoginRedirect();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    loginContext.setIsLoading(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
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
          <div className={styles.createAccount}>
            <br />
            <h3>Create Account</h3>
            <br />

            <Box component="form" onSubmit={handleSubmit}>
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
              <TextField
                required
                fullWidth
                id="outlined-email"
                label="Email"
                type="email"
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
                fullWidth
                variant="outlined"
                size="large"
                sx={{ color: "gray" }}
                onClick={handleLoginRedirect}
              >
                Already have an account? Login here
              </Button>
            </Box>

            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateAccount;
