import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();

  const handleLoginRedirect = (path) => {
    history.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://url-shortener-sg.herokuapp.com/users/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            name: name,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setSuccessMessage("Account created!");
        setShowMessage(true);
        setUsername("");
        setPassword("");
        setName("");
      } else {
        setFailureMessage("Account not created!");
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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
          <Alert
            variant="success"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            {successMessage}
          </Alert>
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

      <div className={styles.createAccount}>
        <h3>Create Account</h3>
        <br />

        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRegisterUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={username}
              placeholder="Enter username"
              // onChange={(e) => setUsername(e.target.value)}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegisterPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                name="name"
                value={name}
                placeholder="Enter name"
                // onChange={(e) => setName(e.target.value)}
                onChange={handleNameChange}
                required
              />
            </Form.Group>
          </Row>

          <div className="d-grid gap-2">
            <button className={styles.create} type="submit">
              Submit
            </button>
          </div>

          <hr />

          <div className="d-grid gap-2">
            <button
              className={styles.login}
              type="submit"
              onClick={handleLoginRedirect}
            >
              Already have an account? Click here to log in
            </button>
          </div>
        </form>

        <br />
      </div>
    </>
  );
};

export default CreateAccount;
