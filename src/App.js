import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginContext from "./context/login-context";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import CreateUrl from "./pages/CreateUrl";
import Display from "./pages/Display";

// import { ThemeProvider, createTheme, CssBaseline } from "@mui/material/styles";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const App = () => {
  const [profileName, setProfileName] = useState("");
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  return (
    <>
      {/* <ThemeProvider theme={darkTheme}>
     <CssBaseline /> */}
      <LoginContext.Provider
        value={{
          profileName,
          setProfileName,
          isLoading,
          setIsLoading,
          loggedIn,
          setLoggedIn,
          user,
          setUser,
          renderCount,
          setRenderCount,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />

            {loggedIn ? (
              <React.Fragment>
                <Route path="/profile" element={<Profile />} />
                <Route path="/createurl" element={<CreateUrl />} />
                <Route path="/myurls" element={<Display />} />
              </React.Fragment>
            ) : null}
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
      {/*  </ThemeProvider> */}
    </>
  );
};

export default App;
