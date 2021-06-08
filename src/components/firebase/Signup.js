import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { actions } from "../../redux/actions";
import { connect } from "react-redux";
import { addChannel } from '../../services/Channel.service.js'

function Signup(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // props.onAuthStateChanged();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      // console.log("userName:" + userRef.current.value);
      // props.setUserName(userRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      await addChannel(props.dispatchAddChannel);
      props.setAdminEmail(emailRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group id="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={userRef} required />
            </Form.Group> */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setAdminEmail: (value) => dispatch(actions.setAdminEmail(value)),
  // setUserName: (user) => dispatch(actions.setUserName(user)),
  // onAuthStateChanged: () => dispatch({ type: "ON_AUTH_STATE_CHANGE" }),
  dispatchAddChannel: () => dispatch(actions.addChannel())

});

export default connect(null, mapDispatchToProps)(Signup);
