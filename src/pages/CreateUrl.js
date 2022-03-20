import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import { useHistory } from "react-router-dom";
// import styles from "./CreateUrl.module.css";

const CreateUrl = () => {
  const [input, setInput] = useState("");

  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.profileName;

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
      history.push("/myurls");
      window.location.reload(false);
    }
  };

  return (
    <>
      <h1>URL Shortener</h1>

      <form onSubmit={onSubmitQuery} className="my-4 form-inline">
        <div className="form-group mb-2 col">
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
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateUrl;
