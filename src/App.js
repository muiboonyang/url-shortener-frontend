import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LoginContext from "./context/login-context";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import CreateUrl from "./pages/CreateUrl";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://url-shortener-sg.herokuapp.com/sessions");
    const data = await res.json();
    console.log(data);
  };

  return (
    <LoginContext.Provider
      value={{
        profileName,
        setProfileName,
        loggedIn,
        setLoggedIn,
        handleLogin,
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
            </Switch>
          ) : null}
        </Switch>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
