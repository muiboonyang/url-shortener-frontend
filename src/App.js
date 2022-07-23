import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { useSelector } from "react-redux";
// import { loginStatusState } from "./redux/userSlice";

// import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import CreateUrl from "./pages/CreateUrl";
import Display from "./pages/Display";

const App = () => {
  // const loggedIn = useSelector(loginStatusState);
  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <>
      <BrowserRouter>
        {/* <NavBar /> */}
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
    </>
  );
};

export default App;
