import { NavLink, Redirect } from "react-router-dom";
import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import styles from "./NavBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faLink,
  faUser,
  faEnvelope,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const loginContext = useContext(LoginContext);
  const currentUser = loginContext.user;
  const profileName = loginContext.profileName;

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://url-shortener-sg.herokuapp.com/sessions/logout"
      );
      await res.json();

      if (res.status === 200) {
        setSuccessMessage("Log out successful!");
        loginContext.setLoggedIn(false);
        loginContext.setUser("");
        setShowMessage(true);
      } else {
        setFailureMessage("Log out unsuccessful!");
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        <Navbar>
          {currentUser ? (
            <>
              <Navbar.Brand>
                <NavLink to="/" exact style={{ textShadow: "1px 0 grey" }}>
                  <FontAwesomeIcon icon={faLink} /> Link Shortener
                </NavLink>
              </Navbar.Brand>

              <Nav className="me-auto">
                <NavLink to="/createurl" activeClassName={styles.active}>
                  <FontAwesomeIcon icon={faEnvelope} /> Create New Link
                </NavLink>
                <NavLink to="/myurls" activeClassName={styles.active}>
                  <FontAwesomeIcon icon={faList} /> My Links
                </NavLink>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/profile" activeClassName={styles.active}>
                    <FontAwesomeIcon icon={faUser} /> {profileName}
                  </NavLink>

                  <NavLink onClick={handleLogout} to="/">
                    <FontAwesomeIcon icon={faSignOut} />
                  </NavLink>
                </Nav>
              </div>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Navbar.Brand>
                  <NavLink to="/" exact style={{ textShadow: "1px 0 grey" }}>
                    <FontAwesomeIcon icon={faLink} /> Link Shortener
                  </NavLink>
                </Navbar.Brand>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/login" activeClassName={styles.active}>
                    <FontAwesomeIcon icon={faUser} /> Log In
                  </NavLink>
                </Nav>
              </div>
            </>
          )}
        </Navbar>
      </div>

      <div className={styles.message}>
        {successMessage && showMessage ? (
          <>
            <Redirect to="/login" />
            <Alert
              variant="success"
              onClose={() => setShowMessage(false)}
              dismissible
            >
              {successMessage}
            </Alert>
          </>
        ) : null}
        {failureMessage && showMessage ? (
          <Alert
            variant="danger"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            {failureMessage}
          </Alert>
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
