import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../context/login-context";
import EditDisplay from "./EditDisplay";
import { v4 as uuidv4 } from "uuid";

import styles from "./Display.module.css";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Display = () => {
  const [results, setResults] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState("");
  // console.log(results);

  const loginContext = useContext(LoginContext);
  const { user, renderCount } = loginContext;

  const urlResults = async () => {
    loginContext.setIsLoading(true);
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/${user}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }
    loginContext.setIsLoading(false);
  };

  const delResult = async (shortId) => {
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

  const toggleEditForm = (shortId) => {
    setIsEditing(!isEditing);

    const index = results.findIndex((object) => {
      return object.short === shortId;
    });
    setIndex(index);
  };

  useEffect(() => {
    urlResults();
    // eslint-disable-next-line
  }, [renderCount]);

  const displayResults = results.map((url) => {
    return (
      <tr key={uuidv4()}>
        <td>
          <a href={url.full} target="_blank" rel="noreferrer">
            {url.full}
          </a>
        </td>

        <td>
          <a
            href={`https://url-shortener-sg.herokuapp.com/${url.short}`}
            target="_blank"
            id="link"
            rel="noreferrer"
          >
            {url.short}
          </a>
        </td>

        <td>{url.clicks}</td>

        <td>
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
        </td>

        <td>
          <IconButton
            aria-label="copy"
            onClick={() => {
              toggleEditForm(url.short);
            }}
          >
            <EditIcon />
          </IconButton>
        </td>

        <td>
          <IconButton
            aria-label="delete"
            onClick={() => {
              delResult(url.short);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    );
  });

  return (
    <>
      {isEditing ? (
        <EditDisplay
          longurl={results.full}
          toggleEditForm={toggleEditForm}
          results={results}
          urlResults={urlResults}
          index={index}
        />
      ) : (
        ""
      )}
      <div className={styles.container}>
        <br />
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Copy</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>{displayResults}</tbody>
        </table>
      </div>
    </>
  );
};

export default Display;
