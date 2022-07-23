import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { useDispatch, useSelector } from "react-redux";
import { addRenderCount } from "../redux/renderSlice";
import { loadingStatus } from "../redux/loadingSlice";

import styles from "./CreateUrl.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateUrl = () => {
  const [input, setInput] = useState("");

  // Imports the 'isLoading' state from 'loading' slice
  const isLoading = useSelector((state) => state.loading.isLoading);

  // Imports the 'user' state from 'state' slice
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  // Imports the 'loadingStatus' function from 'loading' slice
  const toggleLoading = () => {
    dispatch(loadingStatus());
  };

  // Imports the 'addRenderCount' function from 'render' slice
  const addRender = () => {
    dispatch(addRenderCount());
  };

  const navigate = useNavigate();

  const shortenUrl = async () => {
    toggleLoading();
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/shortUrls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
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
    toggleLoading();
  };

  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmitQuery = (e) => {
    e.preventDefault();

    if (input.length > 0) {
      shortenUrl();
      setInput("");
      addRender();
    }
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
          <br />
          <h3>Create Short Link</h3>
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
                sx={{ ml: 5, py: 0, bgcolor: "black" }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateUrl;
