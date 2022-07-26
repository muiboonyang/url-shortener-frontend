import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadingStatus } from "../redux/loadingSlice";
import { logout } from "../redux/userSlice";

import styles from "./NavBar.module.css";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
// import AddLinkIcon from "@mui/icons-material/AddLink";
// import ListIcon from "@mui/icons-material/List";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleProfileRedirect = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };

  const handleCreateUrlRedirect = () => {
    setAnchorElNav(null);
    navigate("/createurl");
  };

  const handleMyUrlsRedirect = () => {
    setAnchorElNav(null);
    navigate("/myurls");
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnchorElUser(null);
    dispatch(loadingStatus());
    try {
      const res = await fetch(
        "https://url-shortener-sg.herokuapp.com/sessions/logout"
      );
      const data = await res.json();

      if (res.status === 200) {
        dispatch(logout());
        handleLoginRedirect();
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
        <ThemeProvider theme={darkTheme}>
          {currentUser ? (
            <>
              <AppBar position="static">
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <LinkIcon
                      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    >
                      URL_Shortener
                    </Typography>

                    <Box
                      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: "block", md: "none" },
                        }}
                      >
                        <MenuItem onClick={handleCreateUrlRedirect}>
                          <Typography textAlign="center">
                            Create New Link
                          </Typography>
                        </MenuItem>

                        <MenuItem onClick={handleMyUrlsRedirect}>
                          <Typography textAlign="center">My Links</Typography>
                        </MenuItem>
                      </Menu>
                    </Box>

                    <LinkIcon
                      sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    >
                      URL_Shortener
                    </Typography>

                    <Box
                      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                    >
                      <Button
                        onClick={handleCreateUrlRedirect}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        Create New Link
                      </Button>

                      <Button
                        onClick={handleMyUrlsRedirect}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        My Links
                      </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <AccountCircle />
                          <Typography
                            variant="h6"
                            noWrap
                            sx={{
                              pl: 1,
                              display: { xs: "none", md: "flex" },
                              fontFamily: "monospace",
                              fontWeight: 700,
                              letterSpacing: "0rem",
                              color: "inherit",
                              textDecoration: "none",
                              "&:hover": {
                                color: "white",
                              },
                            }}
                          >
                            {profileName}
                          </Typography>
                        </IconButton>
                      </Tooltip>

                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleProfileRedirect}>
                          <Typography textAlign="center">Profile</Typography>
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </>
          ) : (
            <>
              <AppBar position="static">
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <LinkIcon
                      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    >
                      URL_Shortener
                    </Typography>

                    <Box
                      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    ></Box>

                    <LinkIcon
                      sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    >
                      URL_Shortener
                    </Typography>

                    <Box
                      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                    ></Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Button
                        color="inherit"
                        onClick={handleLoginRedirect}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        Login
                      </Button>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </>
          )}
        </ThemeProvider>
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

//   return (
//     <>
//       <div className={styles.navbar}>
//         <Navbar>
//           {currentUser ? (
//             <>
//               <Navbar.Brand>
//                 <NavLink to="/" style={{ textShadow: "1px 0 grey" }}>
//                   <IconButton style={{ color: "white" }}>
//                     <LinkIcon />
//                   </IconButton>
//                   Link Shortener
//                 </NavLink>
//               </Navbar.Brand>

//               <Nav className="me-auto">
//                 <NavLink
//                   className={(navData) => (navData.isActive ? "active" : "")}
//                   to="/createurl"
//                 >
//                   <IconButton style={{ color: "white" }}>
//                     <AddLinkIcon />
//                   </IconButton>
//                   Create New Link
//                 </NavLink>
//                 <NavLink
//                   className={(navData) => (navData.isActive ? "active" : "")}
//                   to="/myurls"
//                 >
//                   <IconButton style={{ color: "white" }}>
//                     <ListIcon />
//                   </IconButton>
//                   My Links
//                 </NavLink>
//               </Nav>

//               <div className={styles.loggedInContainer}>
//                 <Nav>
//                   <NavLink
//                     className={(navData) => (navData.isActive ? "active" : "")}
//                     to="/profile"
//                   >
//                     <IconButton style={{ color: "white" }}>
//                       <PersonIcon />
//                     </IconButton>
//                     {profileName}
//                   </NavLink>

//                   <NavLink to="/">
//                     <IconButton
//                       style={{ color: "white" }}
//                       onClick={handleLogout}
//                     >
//                       <LogoutIcon />
//                     </IconButton>
//                   </NavLink>
//                 </Nav>
//               </div>
//             </>
//           ) : (
//             <>
//               <Nav className="me-auto">
//                 <Navbar.Brand>
//                   <NavLink to="/" style={{ textShadow: "1px 0 grey" }}>
//                     <IconButton style={{ color: "white" }}>
//                       <LinkIcon />
//                     </IconButton>
//                     Link Shortener
//                   </NavLink>
//                 </Navbar.Brand>
//               </Nav>

//               <div className={styles.loggedInContainer}>
//                 <Nav>
//                   <NavLink
//                     className={(navData) => (navData.isActive ? "active" : "")}
//                     to="/login"
//                   >
//                     <IconButton style={{ color: "white" }}>
//                       <PersonIcon />
//                     </IconButton>
//                     Log In
//                   </NavLink>
//                 </Nav>
//               </div>
//             </>
//           )}
//         </Navbar>
//       </div>

//     </>
//   );
// };

export default NavBar;
