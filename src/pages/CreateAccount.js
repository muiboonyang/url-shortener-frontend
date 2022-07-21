import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/login-context";

import styles from "./CreateAccount.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingSpinner from "../components/LoadingSpinner";

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
              <Button variant="contained" type="submit" size="large" fullWidth>
                Submit
              </Button>
              <hr />
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleLoginRedirect}
              >
                Create Account
              </Button>
            </Box>

            {/* <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRegisterUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegisterPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                name="name"
                value={name}
                placeholder="Enter name"
                onChange={handleNameChange}
                required
              />
            </Form.Group>
          </Row>

          <div className="d-grid gap-2">
            <button className={styles.create} type="submit">
              Submit
            </button>
          </div>

          <hr />

          <div className="d-grid gap-2">
            <button
              className={styles.login}
              type="submit"
              onClick={handleLoginRedirect}
            >
              Already have an account? Click here to log in
            </button>
          </div>
        </form> */}

            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateAccount;
