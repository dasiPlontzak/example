import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import LogOutConfirm from '../firebase/LogoutConfirm';

export default function Navbar() {
  const [error, setError] = useState("");
  const currentUser = "InbalGabay";
  // const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [showLogOutConfirm, setShowLogOutConfirm] = useState(false);

  const handleShowLogOutConfirm = () => {
    setShowLogOutConfirm(!showLogOutConfirm);
  };

  async function handleLogout() {
    setError("");
    try {
      // await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  const logOutLink = () => {
    return (
      <a href="#" className="Log out" onClick={handleShowLogOutConfirm}>
        <p>Log out</p>
      </a>)
  }

  const loginLink = () => {
    return (
      <a href="#" className="Login" onClick={() => { history.push('/login') }}>
        <p>Login</p>
      </a>
    )
  }

  return (
    <nav className="navbar fixed-top bg-white">
      <div className="container">
        <a href="/" className="nav-link">
          <p>Home</p>
        </a>
        {/* <a href="/recorderAudio/false" className="nav-link">
          <p>Add new record</p>
        </a> */}

        <a href="/contact" className="nav-link">
          <p>Contact us</p>
        </a>

        <a href="#" className="nav-link">
          <p>About us</p>
        </a>
        {currentUser ? logOutLink() : loginLink()}
        {/* {loginLink()} */}
      </div>
      <LogOutConfirm
        show={showLogOutConfirm}
        handleShow={handleShowLogOutConfirm}
        handleLogout={handleLogout}
      />

    </nav>
  );
}
