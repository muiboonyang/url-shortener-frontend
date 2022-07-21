import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import { useNavigate } from "react-router-dom";

import styles from "./CreateUrl.module.css";
import LoadingSpinner from "../components/LoadingSpinner";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateUrl = () => {
  const [input, setInput] = useState("");

  const loginContext = useContext(LoginContext);
  let { user, setRenderCount, renderCount } = loginContext;

  const navigate = useNavigate();

  const shortenUrl = async () => {
    loginContext.setIsLoading(true);
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/shortUrls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            url: input,
          }),
        }
      );

      const data = await res.json();
      if (data.status === "ok") {
        console.log(data.message);
        navigate("/myurls");
      }
    } catch (err) {
      console.log(err);
    }
    loginContext.setIsLoading(false);
  };

  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmitQuery = (e) => {
    e.preventDefault();

    if (input.length > 0) {
      shortenUrl();
      setInput("");
      setRenderCount(renderCount + 1);
    }
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
          <br />
          <h3>Link Shortener</h3>
          <br />
          <div className={styles.createUrl}>
            <Box
              component="form"
              onSubmit={onSubmitQuery}
              sx={{ m: 1, display: "flex", flexDirection: "row" }}
              autoComplete="off"
            >
              <TextField
                required
                fullWidth
                variant="standard"
                id="outlined"
                label="URL"
                type="url"
                value={input}
                onChange={handleSearchInput}
              />

              <Button
                variant="contained"
                size="small"
                type="submit"
                sx={{ ml: 5, py: 0 }}
              >
                Shorten
              </Button>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateUrl;
