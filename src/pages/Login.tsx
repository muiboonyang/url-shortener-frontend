import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";
import { login } from "../redux/userSlice";

import styles from "./Login.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const Login = (): JSX.Element => {
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLoginRedirect = () => {
    navigate("/createurl");
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        setAlert(data.message);
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
          <div className={styles.login}>
            <Container maxWidth="sm">
              <Box>
                <br />
                <h3>Log In</h3>
                <br />
              </Box>

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
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
