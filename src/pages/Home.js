import React from "react";
import HomepageCarousel from "../components/HomepageCarousel";

import styles from "./Home.module.css";
import Button from "@mui/material/Button";

const Home = () => {
  const seedUser = async () => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/seeduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUsers = async () => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/delete/alluser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HomepageCarousel />
      <div className={styles.buttons}>
        <Button variant="outlined" color="success" onClick={seedUser}>
          Seed Users
        </Button>
        <Button variant="outlined" color="error" onClick={deleteUsers}>
          Delete Users
        </Button>
      </div>
    </>
  );
};

export default Home;
