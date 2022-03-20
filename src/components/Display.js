import React, { useState } from "react";

const Display = () => {
  const [results, setResults] = useState("");

  const urlResults = async () => {
    try {
      const res = await fetch(`https://url-shortener-sg.herokuapp.com/urls/`, {
        mode: "cors",
      });
      const data = res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(results);

  return <></>;
};

export default Display;

/* <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Copy</th>
            <th>Clicks</th>
          </tr>
        </thead>

        <tbody>
          <% shortUrls.forEach(shortUrl => { %>

          <tr>
            <td>
              <a href="<%= shortUrl.full %>" target="_blank"
                ><%= shortUrl.full %></a
              >
            </td>
            <td>
              <a href="<%= shortUrl.short %>" target="_blank" id="link"
                ><%= shortUrl.short %></a
              >
            </td>
            <td>
              <a href="<%= shortUrl.short %>" target="_blank">
                <i class="fa-solid fa-copy"></i>
              </a>
            </td>
            <td><%= shortUrl.clicks %></td>
          </tr>
          <% }) %>
        </tbody>
      </table> */
