import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";

import styles from "./CreateAccount.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const CreateAccount = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  const [alert, setAlert] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alert]);

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

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loadingStatus());

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
        setAlert(data.message);
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <div className={styles.container}>
      {alert ? (
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={2}
        >
          <Alert
            severity="error"
            onClose={() => {
              setAlert("");
            }}
          >
            {alert}
          </Alert>
        </Stack>
      ) : null}

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
          <div className={styles.createAccount}>
            <Container maxWidth="sm">
              <Box>
                <br />
                <h3>Create Account</h3>
                <br />
              </Box>

              <Box component="form" onSubmit={handleSubmit} autoComplete="off">
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
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateAccount;
