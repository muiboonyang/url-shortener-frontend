import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoadingSpinner from "./LoadingSpinner";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";
import { logout } from "../redux/userSlice";

import styles from "./NavBar.module.css";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const NavBar = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const currentUser = useSelector((state: RootState) => state.user.username);
  const profileName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogoutRedirect = () => {
    navigate("/login");
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loadingStatus());
    try {
      const res = await fetch(
        "https://url-shortener-sg.herokuapp.com/sessions/logout"
      );
      const data = await res.json();

      if (res.status === 200) {
        dispatch(logout());
        handleLogoutRedirect();
        setMessage(data.message);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(loadingStatus());
  };

  return (
    <>
      <div className={styles.navbar}>
        <Navbar>
          {currentUser ? (
            <>
              <Navbar.Brand>
                <NavLink to="/" style={{ textShadow: "1px 0 grey" }}>
                  <IconButton style={{ color: "white" }}>
                    <LinkIcon />
                  </IconButton>
                  Link Shortener
                </NavLink>
              </Navbar.Brand>

              <Nav className="me-auto">
                <NavLink
                  className={(navData) => (navData.isActive ? "active" : "")}
                  to="/createurl"
                >
                  <IconButton style={{ color: "white" }}>
                    <AddLinkIcon />
                  </IconButton>
                  Create New Link
                </NavLink>
                <NavLink
                  className={(navData) => (navData.isActive ? "active" : "")}
                  to="/myurls"
                >
                  <IconButton style={{ color: "white" }}>
                    <ListIcon />
                  </IconButton>
                  My Links
                </NavLink>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink
                    className={(navData) => (navData.isActive ? "active" : "")}
                    to="/profile"
                  >
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
                  <NavLink to="/" style={{ textShadow: "1px 0 grey" }}>
                    <IconButton style={{ color: "white" }}>
                      <LinkIcon />
                    </IconButton>
                    Link Shortener
                  </NavLink>
                </Navbar.Brand>
              </Nav>

              <div className={styles.loggedInContainer}>
                <Nav>
                  <NavLink
                    className={(navData) => (navData.isActive ? "active" : "")}
                    to="/login"
                  >
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

      {message ? (
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={2}
        >
          <Alert
            onClose={() => {
              setMessage("");
            }}
          >
            {message}
          </Alert>
        </Stack>
      ) : null}

      {isLoading ? (
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
