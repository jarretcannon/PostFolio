import React, { useContext, useEffect, useState } from "react";
import PostContext from "../contexts/PostContext";
import {

  Button, Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";





function HomePage() {
  const { posts, getAllPosts, getPosts, deletePost, getPostsByUserId } = useContext(PostContext);
  let { user } = useContext(UserContext);
 

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
    <div>
    

    <div>
{posts.map((post) => (
  <div key={post.id} className="post-container">
    <Card style={{ width: '18rem', margin: 'auto', display: 'block' }}>
       <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Text>
    <div dangerouslySetInnerHTML={{__html: post.embed}} />
    </Card.Text>
    <Card.Subtitle>{user.fullName}</Card.Subtitle>
    <Card.Footer>Credits: {post.credit}</Card.Footer>
    </Card.Body>
    </Card>
  </div>
))}
</div> 

</div>


)}

export default HomePage;
