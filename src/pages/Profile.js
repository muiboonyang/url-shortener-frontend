import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../context/login-context";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import styles from "./Profile.module.css";

const Profile = () => {
  const loginContext = useContext(LoginContext);
  const { user } = loginContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //================
  // Fetch user data from API (by specific username)
  //================

  const url = `https://url-shortener-sg.herokuapp.com/users/${user}`;

  const getUserInfo = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUsername(data.username);
      setName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  //================
  // Update current user
  //================

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/users/${user}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            name: name,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setSuccessMessage("Account updated!");
        setShowMessage(true);
        setPassword("");
        setName("");
        // loginContext.setLoggedIn(false);
      } else {
        setFailureMessage("Account not updated!");
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <div className={styles.message}>
        {successMessage && showMessage ? (
          <>
            <Navigate to="/" />
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

      <br />

      <div className={styles.profile}>
        <form onSubmit={handleSubmit}>
          <h2>Update Profile</h2>
          <Form.Group className="mb-3" controlId="formRegisterUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegisterPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Enter new password"
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="input"
                name="name"
                onChange={handleNameChange}
                placeholder={name}
              />
            </Form.Group>
          </Row>

          <button type="submit" className={styles.btn}>
            Update
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Profile;
