import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addRenderCount } from "../redux/renderSlice";
import { loadingStatus } from "../redux/loadingSlice";

import styles from "./CreateUrl.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateUrl = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const shortenUrl = async () => {
    dispatch(loadingStatus());
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
      if (res.status === 200) {
        console.log(data.message);
        navigate("/myurls");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.length > 0) {
      shortenUrl();
      setInput("");
      dispatch(addRenderCount());
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
