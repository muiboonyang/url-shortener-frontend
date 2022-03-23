import React, { useState } from "react";

const EditDisplay = (props) => {
  const [linkEdit, setLink] = useState(props.link);
  let results = props.results;
  console.log(results);

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
    // const newExpense = {
    //   id,
    //   description: descriptionEdit.trim(),
    //   price: (Math.round(parseFloat(priceEdit) * 100) / 100).toFixed(2),
    //   date: Date.parse(dateEdit),
    // };
    editResult(results[0].short);
    props.toggleEditForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      Edit long url:{" "}
      <input
        className="editInput"
        name="description"
        type="text"
        onChange={(e) => handleLinkChange(e.target.value)}
        value={linkEdit}
        placeholder={results[0].full}
      />
      <button className="editSubmitButton" type="submit">
        Submit
      </button>
    </form>
  );
};

export default EditDisplay;
