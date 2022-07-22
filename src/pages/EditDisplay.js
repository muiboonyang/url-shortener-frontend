import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";

// import styles from "./EditDisplay.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditDisplay = (props) => {
  let { results, index } = props;
  const [newLink, setNewlink] = useState(results[index].full);

  const loginContext = useContext(LoginContext);

  const editResult = async (shortId) => {
    loginContext.setIsLoading(true);
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/${shortId}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: newLink,
          }),
        }
      );

      if (res.status === 200) {
        props.urlResults();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLinkChange = (event) => {
    setNewlink(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editResult(results[index].short);
    props.toggleEditForm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ m: 1, display: "flex", flexDirection: "row" }}
      autoComplete="off"
    >
      <TextField
        required
        fullWidth
        variant="filled"
        id="outlined"
        label="Edit URL"
        type="url"
        value={newLink}
        onChange={handleLinkChange}
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
  );
};

export default EditDisplay;
