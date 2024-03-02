import React, { useContext, useEffect, useState } from "react";
import PostContext from "../contexts/PostContext";
import {

  Button, Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";





function HomePage() {
  const { posts, getAllPosts, getPosts, deletePost } = useContext(PostContext);

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
   
      <div>
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <Card style={{ width: '18rem', margin: 'auto', display: 'block' }}>
               <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Link to={`/${post.id}/edit`} key={post.id} className="btn btn-primary mx-3">Edit</Link>
            <Button variant="danger" onClick={() => handleDelete(post.id)}>
              Delete
            </Button>
            </Card.Body>
            </Card>
          </div>
        ))}
      </div> )
    
}

export default HomePage;
