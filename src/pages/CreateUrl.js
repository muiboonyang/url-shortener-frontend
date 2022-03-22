import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import { useHistory } from "react-router-dom";
import styles from "./CreateUrl.module.css";

const CreateUrl = () => {
  const [input, setInput] = useState("");

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.user;
  let updateThis = loginContext.updateThis;

  const history = useHistory();

  const shortenUrl = async () => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/urls/shortUrls`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser,
          url: input,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const onSubmitQuery = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      shortenUrl();
      setInput("");
      updateThis.current = !updateThis.current;
      history.push("/myurls");
    }
  };

  return (
    <div className={styles.container}>
      <h3>URL Shortener</h3>

      <form onSubmit={onSubmitQuery}>
        <div className={styles.createUrl}>
          <label htmlFor="fullUrl" className="sr-only">
            Enter URL here:
          </label>
          <input
            required
            placeholder="URL"
            type="url"
            name="fullUrl"
            id="fullUrl"
            className="form-control"
            value={input}
            onChange={handleSearchInput}
          />

          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUrl;
