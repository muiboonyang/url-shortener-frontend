import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import CreateUrl from "./pages/CreateUrl";
import Display from "./pages/Display";

const App = () => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />

          <React.Fragment>
            <Route
              path="/profile"
              element={
                <Protected isLoggedIn={loggedIn}>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/createurl"
              element={
                <Protected isLoggedIn={loggedIn}>
                  <CreateUrl />
                </Protected>
              }
            />
            <Route
              path="/myurls"
              element={
                <Protected isLoggedIn={loggedIn}>
                  <Display />
                </Protected>
              }
            />
          </React.Fragment>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
