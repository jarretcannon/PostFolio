import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; 
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function UserProfile() {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const { getUserById } = useContext(UserContext);
  const { getPostsByUserId, deletePost } = useContext(PostContext);

                         

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = getUserById(userId);
      setUserProfile(user);
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const postsData = await getPostsByUserId(userId);
        setPosts(postsData.data);
      }
    }
    fetchData();
  }, [userId]);

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <>
      {userProfile && (
        <Container className="profile-container">
          <Row>
            <Col xs={12} md={4}>
              <div className="profile-photo-container">
                <Image
                  src={userProfile.photo}
                  alt="Profile"
                  roundedCircle
                  className="profile-photo"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className="profile-info">
                <h2>{userProfile.fullName}</h2>
                <p>Email: {userProfile.email}</p>
                <p>Location: {userProfile.location}</p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <br />

      <div className="card-container">
        {sortedPosts.map((post) => (
          <div key={post.id} className="post-container">
            <div
              className="card text-white bg-dark mb-3"
              style={{ width: "18rem" }}
            >
              <div className="card-header"></div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: post.embed }} />
                <h5 className="profile-name">{userProfile?.fullName}</h5>
                <p className="card-text">Credits: {post.credit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserProfile;