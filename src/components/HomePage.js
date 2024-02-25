import React, { useContext, useEffect, useState } from "react";
import PostContext from "../contexts/PostContext";
import {

  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";





function HomePage() {
  const { posts, getAllPosts, getPosts, deletePost } = useContext(PostContext);

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
   
      <div>
        <h1>PostFolio</h1>
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <Link to={`/${posts.id}/edit`} key={post.id} className="btn btn-primary mx-3">Edit</Link>
            <Button variant="danger" onClick={() => handleDelete(post.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div> )
    
}

export default HomePage;
