import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { actions } from "../redux/actions";
import { connect } from "react-redux";
//import keys from "../config/keys";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const { children } = props;
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    props.setCurrentUser(null, null);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    // props.onAuthStateChange();
    // setLoading(false);
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("in auth state:)");
      if (user) {
        console.log("user is: ");
        console.log(user);
        props.setCurrentUser(user.displayName, user.email);
        user.getIdToken(true)
          .then(function (idToken) {
            console.log("idToken: " + idToken);
            //call here...
            axios({
              method: 'post',
              url: `/users/check`,
              data: {
                user: user,
                idToken: idToken
              }
            })
              .then(res => {
                console.log("axios woeked!!!");
                console.log(res);
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (name, email) =>
    dispatch(actions.setCurrentUser({ name: name, email: email })),
  // onAuthStateChange: () => dispatch({ type: "ON_AUTH_STATE_CHANGE" }),
}
);

export default connect(null, mapDispatchToProps)(AuthProvider);
