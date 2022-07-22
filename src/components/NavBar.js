import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import LoginContext from "../context/login-context";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

import styles from "./NavBar.module.css";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

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
                  <IconButton style={{ color: "white" }}>
                    <LinkIcon />
                  </IconButton>
                  Link Shortener
                </NavLink>
              </Navbar.Brand>

              <Nav className="me-auto">
                <NavLink to="/createurl" activeclassname={styles.active}>
                  <IconButton style={{ color: "white" }}>
                    <AddLinkIcon />
                  </IconButton>
                  Create New Link
                </NavLink>
                <NavLink to="/myurls" activeclassname={styles.active}>
                  <IconButton style={{ color: "white" }}>
                    <ListIcon />
                  </IconButton>
                  My Links
                </NavLink>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/profile" activeclassname={styles.active}>
                    <IconButton style={{ color: "white" }}>
                      <PersonIcon />
                    </IconButton>
                    {profileName}
                  </NavLink>

                  <NavLink to="/">
                    <IconButton
                      style={{ color: "white" }}
                      onClick={handleLogout}
                    >
                      <LogoutIcon />
                    </IconButton>
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
                    <IconButton style={{ color: "white" }}>
                      <LinkIcon />
                    </IconButton>
                    Link Shortener
                  </NavLink>
                </Navbar.Brand>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink to="/login" activeclassname={styles.active}>
                    <IconButton style={{ color: "white" }}>
                      <PersonIcon />
                    </IconButton>
                    Log In
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
