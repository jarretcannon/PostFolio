import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function Profile() {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);
  const { getPostsByUserId, deletePost } = useContext(PostContext);

  const handleDelete = (id) => {
    deletePost(id);
  };

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const postsData = await getPostsByUserId(user?.id);
        setPosts(postsData.data);
      }
    }
    fetchData();
  }, [user]);

  // Sort posts by id in descending order
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <>
      <Container className="profile-container">
        <Row>
          <Col xs={12} md={4}>
            <Image src={user?.photo} alt="Profile" roundedCircle className="profile-photo" />
          </Col>
          <Col xs={12} md={8}>
            <div className="profile-info">
              <h2>{user?.fullName}</h2>
              <p>Email: {user?.email}</p>
              <p>Location: {user?.location}</p>
            </div>
          </Col>
        </Row>
      </Container>
      <br/>
  
      <div className="card-container">
        {sortedPosts.map((post) => (
          <div key={post.id} className="post-container">
            <div className="card text-white bg-dark mb-3" style={{ width: '18rem' }}>
              <div className="card-header"></div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: post.embed }} />
                <h5>{user?.fullName}</h5>
                <p className="card-text">Credits: {post.credit}</p>
                <Link
                  to={`/${post.id}/edit`}
                  key={post.id}
                  className="btn btn-primary mx-3"
                >
                  Edit
                </Link>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
        }  

export default Profile;


