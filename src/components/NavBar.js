import { NavLink, Redirect } from "react-router-dom";
import React, { useState, useContext } from "react";
import LoginContext from "../context/login-context";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const loginContext = useContext(LoginContext);

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
        loginContext.setProfileName("");
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
          <Navbar.Brand>
            <NavLink
              to="/"
              exact
              activeClassName={styles.active}
              style={{ textShadow: "1px 0 grey" }}
            >
              <i className="fa fa-fw fa-tasks"></i>Link Shortener
            </NavLink>
          </Navbar.Brand>

          <Nav>
            {loginContext.profileName ? (
              <div className={styles.loggedInContainer}>
                <NavLink to="/createurl" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-envelope"></i> Create New Link
                </NavLink>
                <NavLink to="/myurls" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-list"></i>
                  My Links
                </NavLink>

                <NavLink to="/profile" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-user"></i>
                  {loginContext.profileName}
                </NavLink>

                <NavLink onClick={handleLogout} to="/">
                  <i className="fa fa-fw fa-sign-out"></i>
                </NavLink>
              </div>
            ) : (
              <NavLink to="/login" activeClassName={styles.active}>
                <i className="fa fa-fw fa-user"></i> Log In
              </NavLink>
            )}
          </Nav>
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
