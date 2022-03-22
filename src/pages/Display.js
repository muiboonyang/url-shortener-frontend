import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../context/login-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import styles from "./Display.module.css";

const Display = () => {
  const [results, setResults] = useState([]);

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.user;
  const updateThis = loginContext.updateThis;

  const urlResults = async () => {
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/${currentUser}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  const delResult = async (shortId) => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/delete/${shortId}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editResult = async (shortId) => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/${shortId}/update`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full: "https://www.google.com.sg/",
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(urlResults, 1);
    // eslint-disable-next-line
  }, [updateThis, delResult]);

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
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://url-shortener-sg.herokuapp.com/${url.short}`
              );
            }}
          />
        </td>

        <td>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              editResult(url.short);
            }}
          />
        </td>

        <td>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              delResult(url.short);
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.container}>
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
  );
};

export default Display;
