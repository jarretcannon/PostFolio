import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./logOutUser";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import "./Navigation.css"

function Navigation(){

    const {user} = useContext(UserContext);

    function userProfile(){
      if (user && user.id) {
        return `/profile/${user.id}`;
      } else {
         
        return "/signin";
      }
    }

 


return(
<div className="nav">
<Navbar fixed="top">
  <Container>
    <Navbar.Brand className="brand">Postfolio</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={userProfile()}>
        Profile
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Sign Up
      </Nav.Link>
      <Nav.Link as={Link} to="/signin">
        Sign In
      </Nav.Link>
      <LogoutButton />
    </Nav>
  </Container>
</Navbar>
</div>
)}

export default Navigation