import React, { useContext } from "react";
import PostContext from "../contexts/PostContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "./HomePage.css";

function HomePage() {
  const { posts, deletePost } = useContext(PostContext);
  const { getUserById } = useContext(UserContext);

  // Sort posts by id in descending order
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
    <div className="container">
      <div>
        {sortedPosts.map((post) => (
          <div key={post.id} className="post-container">
            <div
              className="card text-white bg-dark mb-3"
              style={{ width: "18rem", margin: "auto", display: "block" }}
            >
              <div className="card-header"></div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <div dangerouslySetInnerHTML={{ __html: post.embed }} />
                <h7>{getUserById(post.userId)?.fullName}</h7>
                <p className="card-text">Credits: {post.credit}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="create-button">
          <Button as={Link} to="/create" variant="primary" className="circle-button">
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



