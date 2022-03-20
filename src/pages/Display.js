import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../context/login-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const Display = () => {
  const [results, setResults] = useState([]);

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.profileName;

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

  console.log(results);

  useEffect(() => {
    urlResults();
    // eslint-disable-next-line
  }, [results]);

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
            icon={faTrash}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://url-shortener-sg.herokuapp.com/${url.short}`
              );
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Copy</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{displayResults}</tbody>
      </table>
    </>
  );
};

export default Display;
