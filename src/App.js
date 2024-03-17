// App.js
import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import UserContext from "./contexts/UserContext";
import { useContext } from "react";
import LogoutButton from "./components/logOutUser";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfilePage";

function App() {



  return (
    <BrowserRouter>
      <UserProvider>
       <Navigation />

        <div className="main">
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
              <Route path="/profile/" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/userprofile/:userId" element={<UserProfile />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          </PostProvider>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
