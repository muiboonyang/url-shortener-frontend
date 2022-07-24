import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";

import styles from "./EditDisplay.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {
  results: Array<any>;
  selectedIndex: number;
  urlResults: Function;
  toggleEditForm: Function;
};

type Props2 = {
  shortId: string;
};

const EditDisplay = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  let { results, selectedIndex } = props;
  const [newLink, setNewlink] = useState(results[selectedIndex].full);

  const editResult = async (shortId: Props2) => {
    dispatch(loadingStatus());
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
    dispatch(loadingStatus());
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewlink(event.target.value);
  };

  const toggleEditForm = () => {
    props.toggleEditForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editResult(results[selectedIndex].short);
    toggleEditForm();
  };

  return (
    <div className={styles.editUrl}>
      <br />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "row",
        }}
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
          sx={{ ml: 2, py: 0, bgcolor: "black" }}
        >
          Confirm
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 2, py: 0, color: "gray" }}
          onClick={toggleEditForm}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
};

export default EditDisplay;
