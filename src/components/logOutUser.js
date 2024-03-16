// components/LogoutButton.js
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { signOutUser } = useContext(UserContext);
  let navigate = useNavigate();
  const handleLogout = () => {
    if (signOutUser) {
      signOutUser();
      navigate("/signin");
    }
  };

  return (
    <Nav.Link onClick={handleLogout} className="nav-link">
      Log Out
    </Nav.Link>
  );
};

export default LogoutButton;
