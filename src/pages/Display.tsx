import React, { useState, useEffect } from "react";
import EditDisplay from "./EditDisplay";
import { v4 as uuidv4 } from "uuid";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";

import styles from "./Display.module.css";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  shortId: string;
};

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

const Display = (): JSX.Element => {
  const username = useSelector((state: RootState) => state.user.username);
  const renderCount = useSelector(
    (state: RootState) => state.render.renderCount
  );
  const dispatch = useDispatch();

  const [results, setResults] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setIndex] = useState(0);

  const urlResults = async () => {
    dispatch(loadingStatus());
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/${username}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  const delResult = async (shortId: Props) => {
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/delete/${shortId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        urlResults();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEditForm = (shortId: Props) => {
    setIsEditing(!isEditing);

    const targetIndex = results.findIndex((object) => {
      return object.short === shortId;
    });
    setIndex(targetIndex);
  };

  useEffect(() => {
    urlResults();
    // eslint-disable-next-line
  }, [renderCount]);

  const displayResults = results.map((url) => {
    return (
      <TableRow
        key={uuidv4()}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Typography
            component="a"
            href={url.full}
            target="_blank"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
              },
            }}
          >
            {url.full}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Typography
            component="a"
            href={`https://url-shortener-sg.herokuapp.com/${url.short}`}
            target="_blank"
            sx={{
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "white",
              },
            }}
          >
            {url.short}
          </Typography>
        </TableCell>

        <TableCell align="center">{url.clicks}</TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="copy"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://url-shortener-sg.herokuapp.com/${url.short}`
              );
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="copy"
            onClick={() => {
              toggleEditForm(url.short);
            }}
          >
            <EditIcon />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="delete"
            onClick={() => {
              delResult(url.short);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      {isEditing ? (
        <EditDisplay
          toggleEditForm={toggleEditForm}
          results={results}
          urlResults={urlResults}
          selectedIndex={selectedIndex}
        />
      ) : (
        ""
      )}
      <br />
      <div className={styles.display}>
        <br />
        <ThemeProvider theme={lightTheme}>
          <TableContainer component={Paper} elevation={24}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Clicks</TableCell>
                  <TableCell>Copy</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>{displayResults}</TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Display;
