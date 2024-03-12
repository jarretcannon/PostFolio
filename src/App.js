import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PostProvider } from "./contexts/PostProvider";
import HomePage from "./components/HomePage";
import Profile from "./components/ProfilePage";
import CreatePost from "./components/AddPost";
import { Outlet } from "react-router-dom";
import "./App.css";
import UpdateItem from "./components/EditPost";
import { UserProvider } from "./contexts/UserProvider";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {

  
  return (
    <BrowserRouter>
      <div className="nav">
        <Navbar fixed="top">
          <Container>
            <Navbar.Brand>Postfolio</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="create-button">
      <Button as={Link} to="/create" variant="primary" className="circle-button">
        +
      </Button>
    </div>
      <div className="main">
        <Container className="main-container">
          <Stack>
            <Outlet />
          </Stack>
        </Container>
        <UserProvider>
        <PostProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="create" element={<CreatePost />} />
            <Route path=":id/edit" element={<UpdateItem />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/signup" element={ <SignUp /> } />
            <Route path="/signin" element={ <SignIn /> } />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </PostProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
