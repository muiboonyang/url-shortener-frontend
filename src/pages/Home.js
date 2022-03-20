import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./Home.module.css";

const Home = () => {
  const seedUser = async () => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/seeduser`, {
        mode: "no-cors",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUsers = async () => {
    try {
      await fetch(`https://url-shortener-sg.herokuapp.com/delete/alluser`, {
        mode: "no-cors",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={seedUser} variant="dark" type="submit" size="sm">
          Seed Users
        </Button>{" "}
        <Button onClick={deleteUsers} variant="danger" type="submit" size="sm">
          Delete Users
        </Button>
      </div>
    </>
  );
};

export default Home;
