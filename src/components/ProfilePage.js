import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function Profile() {
  const [posts, setPosts] = useState([]);

  const handleDelete = (id) => {
    deletePost(id);
  };

  let { user } = useContext(UserContext);
  let { getPostsByUserId, deletePost } = useContext(PostContext);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const postsData = await getPostsByUserId(user?.id);
        setPosts(postsData.data);
        console.log(posts);
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      <Container className="profile-container">
        <Row>
          <Col xs={12} md={4}>
            <Image src="https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" roundedCircle className="profile-photo" />
          </Col>
          <Col xs={12} md={8}>
            <div className="profile-info">
              <h2>{user?.fullName}</h2>
              <p>Email: {user?.email}</p>
              <p>Location: City, Country</p>
            </div>
          </Col>
        </Row>
      </Container>
      <br/>
  
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <div className="card text-white bg-dark mb-3" style={{ width: '18rem', margin: 'auto', display: 'block', }}>
              <div className="card-header"></div>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
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




   {/* <Card style={{ width: "18rem", margin: "auto", display: "block" }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  <div dangerouslySetInnerHTML={{ __html: post.embed }} />
                </Card.Text>
                <Card.Subtitle>{post.caption}</Card.Subtitle>
                <Card.Subtitle> {user?.fullName}</Card.Subtitle>
                <Card.Footer>{post.credit}</Card.Footer>
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
              </Card.Body>
            </Card> */}