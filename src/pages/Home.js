import React from "react";
import HomepageCarousel from "../components/HomepageCarousel";

// import styles from "./Home.module.css";
// import Button from "@mui/material/Button";

const Home = () => {
  // const seedUser = async () => {
  //   try {
  //     await fetch(`https://url-shortener-sg.herokuapp.com/seeduser`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const deleteUsers = async () => {
  //   try {
  //     await fetch(`https://url-shortener-sg.herokuapp.com/delete/alluser`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <HomepageCarousel />
      {/* <div className={styles.buttons}>
        <Button onClick={seedUser} variant="dark" type="submit" size="sm">
          Seed Users
        </Button>{" "}
        <Button onClick={deleteUsers} variant="danger" type="submit" size="sm">
          Delete Users
        </Button>
      </div> */}
    </>
  );
};

export default Home;
