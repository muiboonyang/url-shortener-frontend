import React, { useState, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LoginContext from "./context/login-context";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import CreateUrl from "./pages/CreateUrl";
import Display from "./pages/Display";

const App = () => {
  const [profileName, setProfileName] = useState("");
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const updateThis = useRef(false);

  return (
    <LoginContext.Provider
      value={{
        profileName,
        setProfileName,
        loggedIn,
        setLoggedIn,
        updateThis,
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={CreateAccount} />

          {loggedIn ? (
            <Switch>
              <Route path="/profile" exact component={Profile} />
              <Route path="/createurl" exact component={CreateUrl} />
              <Route path="/myurls" exact component={Display} />
            </Switch>
          ) : null}
        </Switch>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
