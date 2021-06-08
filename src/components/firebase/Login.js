import React, { useRef, useState ,useEffect} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { actions } from "../../redux/actions";
import { connect } from "react-redux";

export function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const channelName = props.channelName;

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      /*firebase.auth.EmailAuthProvider.PROVIDER_ID*/
    ],
    callbacks: {
      signInSuccess: () => history.push(`/admin/${channelName}`),
    },
  };

  async function handleSubmit(e) {
    console.log("handle submit");
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      //todo: to the prev url
      history.push(`/admin/${channelName}`);
      // history.push("/")
    } catch {
      // console.log("faild to login");
      setError("Failed to log in");
    }
    setLoading(false);
  }
  // useEffect(() => {
  //   props.onAuthStateChanged();
  // }, []);
  return (
    <>
      <Card className="p-2 m-auto" style={{ width: "30vw" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            type="submit"
          />
          {/* <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form> */}
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default connect(
  (state) => {
    return {
      channelName: state.site.channelName,
  //   };
  // },
  // (dispatch) => {
  //   return {
  //     onAuthStateChanged: () => dispatch({ type: "ON_AUTH_STATE_CHANGE" }),
  //   };
  }}
)(Login);
