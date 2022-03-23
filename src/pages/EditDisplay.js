import React, { useState } from "react";
import styles from "./EditDisplay.module.css";

const EditDisplay = (props) => {
  const [linkEdit, setLink] = useState(props.link);
  let results = props.results;
  let index = props.index;

  const editResult = async (shortId) => {
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/${shortId}/update`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: linkEdit,
          }),
        }
      );

      if (res.status === 200) {
        props.urlResults();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLinkChange = (value) => {
    setLink(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editResult(results[index].short);
    props.toggleEditForm();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.createUrl}>
        <label className={styles.label}>Edit long url: </label>
        <input
          className="form-control"
          type="url"
          name="fullUrl"
          id="fullUrl"
          onChange={(e) => handleLinkChange(e.target.value)}
          value={linkEdit}
          placeholder={results[index].full}
        />
        <button className="btn btn-dark" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditDisplay;
