import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PostProvider } from "./contexts/PostProvider";
import HomePage from "./components/HomePage";
import Profile from "./components/ProfilePage";
import CreatePost from "./components/AddPost";
import { Outlet } from "react-router-dom";

import "./App.css";
import UpdateItem from "./components/EditPost";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar className="bg-body-tertiary" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Home
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Nav className="me-auto">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/create">
                Create
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="main-container">
          <Stack>
            <Outlet />
          </Stack>
        </Container>

        <PostProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="create" element={<CreatePost />} />
            <Route path=":id/edit" element={<UpdateItem />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </PostProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;


