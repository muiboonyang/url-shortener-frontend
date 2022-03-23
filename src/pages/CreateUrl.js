import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import { useHistory } from "react-router-dom";
import styles from "./CreateUrl.module.css";

const CreateUrl = () => {
  const [input, setInput] = useState("");

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.user;
  let setRenderCount = loginContext.setRenderCount;
  let renderCount = loginContext.renderCount;

  const history = useHistory();

  const shortenUrl = async () => {
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/urls/shortUrls`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUser,
            url: input,
          }),
        }
      );

      const data = await res.json();
      if (data.status === "ok") {
        console.log(data.message);
      }
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
      setRenderCount(renderCount + 1);
      history.push("/myurls");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Link Shortener</h3>

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
