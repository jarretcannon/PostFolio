// components/LogoutButton.js
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import UserContext from "../contexts/UserContext";

const LogoutButton = () => {
  const { signOutUser } = useContext(UserContext);

  const handleLogout = () => {
    if (signOutUser) {
      signOutUser();
    }
  };

  return (
    <Nav.Link onClick={handleLogout} className="nav-link">
      Log Out
    </Nav.Link>
  );
};

export default LogoutButton;
