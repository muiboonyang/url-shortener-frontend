import React from "react";

const Input = () => {
  return (
    <>
      <h1>URL Shortener</h1>

      <form action="/shortUrls" method="POST" class="my-4 form-inline">
        <div class="form-group mb-2 col">
          <label for="fullUrl" class="sr-only">
            Enter URL here:
          </label>
          <input
            required
            placeholder="URL"
            type="url"
            name="fullUrl"
            id="fullUrl"
            class="form-control"
          />
        </div>

        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Input;
