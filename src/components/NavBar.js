import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import LoginContext from "../context/login-context";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./NavBar.module.css";
import LoadingSpinner from "../components/LoadingSpinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faLink,
  faUser,
  faGlobe,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.user;
  const profileName = loginContext.profileName;

  const navigate = useNavigate();

  const handleLogoutRedirect = () => {
    navigate("/login");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    loginContext.setIsLoading(true);
    try {
      const res = await fetch(
        "https://url-shortener-sg.herokuapp.com/sessions/logout"
      );
      await res.json();

      if (res.status === 200) {
        loginContext.setLoggedIn(false);
        loginContext.setUser("");
        handleLogoutRedirect();
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    loginContext.setIsLoading(false);
  };

  return (
    <>
      <div className={styles.navbar}>
        <Navbar>
          {currentUser ? (
            <>
              <Navbar.Brand>
                <NavLink
                  to="/"
                  exact="true"
                  style={{ textShadow: "1px 0 grey" }}
                >
                  <FontAwesomeIcon icon={faLink} /> Link Shortener
                </NavLink>
              </Navbar.Brand>

              <Nav className="me-auto">
                <NavLink to="/createurl" activeclassname={styles.active}>
                  <FontAwesomeIcon icon={faGlobe} /> Create New Link
                </NavLink>
                <NavLink to="/myurls" activeclassname={styles.active}>
                  <FontAwesomeIcon icon={faList} /> My Links
                </NavLink>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/profile" activeclassname={styles.active}>
                    <FontAwesomeIcon icon={faUser} /> {profileName}
                  </NavLink>

                  <NavLink to="/">
                    <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} />
                  </NavLink>
                </Nav>
              </div>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Navbar.Brand>
                  <NavLink
                    to="/"
                    exact="true"
                    style={{ textShadow: "1px 0 grey" }}
                  >
                    <FontAwesomeIcon icon={faLink} /> Link Shortener
                  </NavLink>
                </Navbar.Brand>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/login" activeclassname={styles.active}>
                    <FontAwesomeIcon icon={faUser} /> Log In
                  </NavLink>
                </Nav>
              </div>
            </>
          )}
        </Navbar>
      </div>

      {loginContext.isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : null}
    </>
  );
};

export default NavBar;
