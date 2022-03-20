import React from "react";

const Input = () => {
  return (
    <>
      <h1>URL Shortener</h1>

      <form
        action="https://url-shortener-sg.herokuapp.com/urls/shortUrls"
        method="POST"
        className="my-4 form-inline"
      >
        <div class="form-group mb-2 col">
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
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Input;
